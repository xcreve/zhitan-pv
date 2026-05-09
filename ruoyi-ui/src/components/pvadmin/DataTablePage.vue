<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { computed, onMounted, reactive, ref } from 'vue'
import { Refresh, Search } from '@element-plus/icons-vue'
import PageHeader from '@/components/pvadmin/PageHeader.vue'
import { displayValue, valueOf } from '@/utils/pvadmin/format'
import { normalizePage, unwrapData } from '@/utils/pvadmin/ruoyi'
import type { PvDetailApi, PvListApi, PvQueryParams, PvRecord, PvSearchField, PvTableColumn } from '@/api/pvadmin/types/common'

type FormValue = string | number | null | undefined

const props = withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    columns: PvTableColumn[]
    listApi: PvListApi
    detailApi?: PvDetailApi
    searchFields?: PvSearchField[]
    readonlyReason?: string
    permission: string
    autoLoad?: boolean
    defaultParams?: PvQueryParams
  }>(),
  {
    autoLoad: true
  }
)

const loading = ref(false)
const rows = ref<PvRecord[]>([])
const total = ref(0)
const drawerVisible = ref(false)
const detailLoading = ref(false)
const detail = ref<PvRecord | null>(null)
const form = reactive<Record<string, FormValue>>({})

const queryParams = reactive<{
  pageNum: number
  pageSize: number
}>({
  pageNum: 1,
  pageSize: 10
})

const drawerSize = computed(() => (window.innerWidth <= 560 ? '100%' : '420px'))

async function getList() {
  loading.value = true
  try {
    const response = await props.listApi(cleanParams({
      ...(props.defaultParams || {}),
      ...form,
      pageNum: queryParams.pageNum,
      pageSize: queryParams.pageSize
    }))
    const page = normalizePage<PvRecord>(response)
    rows.value = page.rows
    total.value = page.total
  } catch (error) {
    rows.value = []
    total.value = 0
    ElMessage.error(error instanceof Error ? error.message : '接口请求失败')
  } finally {
    loading.value = false
  }
}

function reset() {
  Object.keys(form).forEach(key => {
    form[key] = undefined
  })
  queryParams.pageNum = 1
  getList()
}

function search() {
  queryParams.pageNum = 1
  getList()
}

async function openDetail(row: PvRecord) {
  const id = String(row.id || '')
  if (!id || !props.detailApi) {
    detail.value = row
    drawerVisible.value = true
    return
  }

  detailLoading.value = true
  drawerVisible.value = true
  try {
    const response = await props.detailApi(id)
    detail.value = unwrapData<PvRecord>(response) || row
  } catch {
    detail.value = row
  } finally {
    detailLoading.value = false
  }
}

function disabledEdit() {
  ElMessage.info(props.readonlyReason || '当前页面按只读方式接入，未启用写接口。')
}

function cleanParams(params: PvQueryParams): PvQueryParams {
  const result: PvQueryParams = {}
  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== undefined && value !== null) result[key] = value
  })
  return result
}

function cellValue(row: PvRecord, column: PvTableColumn): string {
  if (column.formatter) return column.formatter(row)
  return displayValue(valueOf(row, column.prop), column.unit)
}

function tagType(value: unknown) {
  const normalized = String(value ?? '')
  if (['2', '已解决', '正常', 'true'].includes(normalized)) return 'success'
  if (['1', '未解决', '告警', 'false'].includes(normalized)) return 'danger'
  if (['0', '停机', '离线'].includes(normalized)) return 'warning'
  return 'info'
}

onMounted(() => {
  if (props.autoLoad) getList()
})
</script>

<template>
  <div class="pvadmin-page">
    <PageHeader :title="title" :subtitle="subtitle">
      <el-button :icon="Refresh" @click="getList">刷新</el-button>
    </PageHeader>

    <el-card class="pv-card search-card" shadow="never">
      <el-form :model="form" class="search-form" label-width="88px">
        <el-form-item v-for="field in searchFields" :key="field.prop" :label="field.label">
          <el-input
            v-if="!field.type || field.type === 'text'"
            v-model="form[field.prop]"
            clearable
            :placeholder="field.placeholder || `请输入${field.label}`"
            @keyup.enter="search"
          />
          <el-select v-else-if="field.type === 'select'" v-model="form[field.prop]" clearable :placeholder="field.placeholder || `请选择${field.label}`">
            <el-option v-for="option in field.options || []" :key="String(option.value)" :label="option.label" :value="option.value" />
          </el-select>
          <el-date-picker
            v-else-if="field.type === 'month'"
            v-model="form[field.prop]"
            type="month"
            value-format="YYYY-MM"
            :placeholder="field.placeholder || `请选择${field.label}`"
          />
          <el-date-picker
            v-else
            v-model="form[field.prop]"
            type="date"
            value-format="YYYY-MM-DD"
            :placeholder="field.placeholder || `请选择${field.label}`"
          />
        </el-form-item>
        <el-form-item class="search-actions">
          <el-button type="primary" :icon="Search" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="pv-card" shadow="never">
      <template #header>
        <div class="table-head">
          <strong>{{ title }}列表</strong>
          <span class="readonly-hint">{{ readonlyReason || '详情可查看；编辑入口按后端能力启用。' }}</span>
        </div>
      </template>

      <el-table v-loading="loading" :data="rows" empty-text="暂无后端数据" stripe>
        <el-table-column type="index" label="#" width="56" fixed="left" />
        <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label" :min-width="column.minWidth || 120" :width="column.width">
          <template #default="{ row }">
            <el-tag v-if="column.type === 'tag' || column.type === 'status'" :type="tagType(valueOf(row, column.prop))" effect="light">
              {{ cellValue(row, column) }}
            </el-tag>
            <span v-else>{{ cellValue(row, column) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="openDetail(row)" v-hasPermi="[permission]">详情</el-button>
            <el-button link type="info" disabled @click="disabledEdit" v-hasPermi="[permission]">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
      />
    </el-card>

    <el-drawer v-model="drawerVisible" :size="drawerSize" title="详情">
      <el-skeleton v-if="detailLoading" animated :rows="8" />
      <el-descriptions v-else-if="detail" :column="1" border>
        <el-descriptions-item v-for="(value, key) in detail" :key="key" :label="String(key)">
          {{ displayValue(value) }}
        </el-descriptions-item>
      </el-descriptions>
      <el-empty v-else description="暂无详情数据" />
    </el-drawer>
  </div>
</template>

<style scoped>
.pvadmin-page {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pv-card {
  border: 0;
  border-radius: 6px;
  box-shadow: 0 7px 14px 0 rgba(18, 38, 63, 0.06);
}

.search-form {
  display: grid;
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  gap: 2px 12px;
}

.search-form :deep(.el-form-item) {
  margin-bottom: 12px;
}

.search-actions {
  align-items: flex-end;
}

.table-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.readonly-hint {
  color: #6e84a3;
  font-size: 12px;
}

@media (max-width: 900px) {
  .search-form {
    grid-template-columns: repeat(2, minmax(180px, 1fr));
  }
}

@media (max-width: 560px) {
  .search-form {
    grid-template-columns: minmax(0, 1fr);
  }

  .table-head {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
