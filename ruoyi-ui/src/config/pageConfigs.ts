import type { SearchField, TableColumn } from '@/types/ruoyi'
import { displayValue, valueOf } from '@/utils/format'

export const timeTypeField: SearchField = {
  prop: 'timeType',
  label: '时间类型',
  type: 'select',
  options: [
    { label: '日', value: 'DAY' },
    { label: '月', value: 'MONTH' },
    { label: '年', value: 'YEAR' }
  ]
}

export const timeTypeEnumField: SearchField = {
  prop: 'timeTypeEnum',
  label: '时间类型',
  type: 'select',
  options: timeTypeField.options
}

export const dateField: SearchField = { prop: 'queryTime', label: '查询日期', type: 'date' }
export const dataTimeField: SearchField = { prop: 'dataTime', label: '统计日期', type: 'date' }
export const monthField: SearchField = { prop: 'dateTime', label: '统计月份', type: 'month' }

export const stationSearchFields: SearchField[] = [
  { prop: 'code', label: '编号' },
  { prop: 'name', label: '名称' }
]

export const deviceSearchFields: SearchField[] = [
  { prop: 'code', label: '设备编号' },
  { prop: 'name', label: '设备名称' },
  { prop: 'deviceTypeId', label: '设备类型', type: 'select', options: [{ label: '逆变器', value: 'DT_INV' }, { label: '电表', value: 'DT_METER' }, { label: '反送表', value: '3' }] }
]

export const alarmSearchFields: SearchField[] = [
  { prop: 'powerStationName', label: '电站名称' },
  { prop: 'deviceName', label: '设备名称' },
  { prop: 'status', label: '状态', type: 'select', options: [{ label: '未解决', value: '1' }, { label: '已解决', value: '2' }] },
  { prop: 'level', label: '级别', type: 'select', options: [{ label: '一般', value: 1 }, { label: '重要', value: 2 }, { label: '紧急', value: 3 }] }
]

export const stationColumns: TableColumn[] = [
  { prop: 'code', label: '编号', minWidth: 120 },
  { prop: 'name', label: '名称', minWidth: 160 },
  { prop: 'installedCapacity', label: '装机容量', minWidth: 120, unit: ' kW' },
  { prop: 'gridVoltage', label: '并网电压', minWidth: 110, unit: ' V' },
  { prop: 'subsidizedPrices', label: '补贴电价', minWidth: 110, unit: ' 元' },
  { prop: 'lon', label: '经度', minWidth: 110 },
  { prop: 'lat', label: '纬度', minWidth: 110 },
  { prop: 'createTime', label: '创建时间', minWidth: 170 }
]

export const deviceColumns: TableColumn[] = [
  { prop: 'powerStationName', label: '电站', minWidth: 150 },
  { prop: 'code', label: '设备编号', minWidth: 130 },
  { prop: 'name', label: '设备名称', minWidth: 150 },
  { prop: 'deviceType', label: '设备类型', minWidth: 120 },
  { prop: 'capacity', label: '容量', minWidth: 110, unit: ' kW' },
  { prop: 'factory', label: '厂家', minWidth: 130 },
  { prop: 'ratedAcPower', label: '额定交流功率', minWidth: 140, unit: ' kW' },
  { prop: 'ammeter', label: '电表', type: 'tag', minWidth: 90, formatter: row => (row.ammeter ? '是' : '否') }
]

export const alarmColumns: TableColumn[] = [
  { prop: 'powerStationName', label: '电站', minWidth: 150 },
  { prop: 'deviceCode', label: '设备编号', minWidth: 120 },
  { prop: 'deviceName', label: '设备名称', minWidth: 140 },
  { prop: 'dataTime', label: '发生时间', minWidth: 170 },
  { prop: 'errCode', label: '错误码', minWidth: 110 },
  { prop: 'errorDescription', label: '描述', minWidth: 180 },
  { prop: 'level', label: '级别', type: 'tag', minWidth: 90 },
  { prop: 'status', label: '状态', type: 'status', minWidth: 100, formatter: row => (String(row.status) === '2' ? '已解决' : '未解决') }
]

export const generationColumns: TableColumn[] = [
  { prop: 'powerStationName', label: '电站名称', minWidth: 160 },
  { prop: 'deviceName', label: '设备名称', minWidth: 160 },
  { prop: 'sumValue', label: '合计', minWidth: 120, formatter: row => displayValue(valueOf(row, 'sumValue'), ' kWh') },
  { prop: 'timeList', label: '时段数', minWidth: 100, formatter: row => String(Array.isArray(row.timeList) ? row.timeList.length : 0) }
]

export const compareColumns: TableColumn[] = [
  { prop: 'powerStationName', label: '对象', minWidth: 150 },
  { prop: 'currentTime', label: '本期时间', minWidth: 170 },
  { prop: 'currentValue', label: '本期值', minWidth: 120 },
  { prop: 'compareTime', label: '对比时间', minWidth: 170 },
  { prop: 'contrastValues', label: '对比值', minWidth: 120 },
  { prop: 'ratio', label: '增长率', minWidth: 120, formatter: row => displayValue(row.ratio, '%') }
]

export const peakColumns: TableColumn[] = [
  { prop: 'totalPowerConsumption', label: '总耗电量', minWidth: 120 },
  { prop: 'totalPowerCost', label: '总费用', minWidth: 120 },
  { prop: 'tipPowerConsumption', label: '尖耗电量', minWidth: 120 },
  { prop: 'peakPowerConsumption', label: '峰耗电量', minWidth: 120 },
  { prop: 'flatPowerConsumption', label: '平耗电量', minWidth: 120 },
  { prop: 'troughPowerConsumption', label: '谷耗电量', minWidth: 120 },
  { prop: 'deepPowerConsumption', label: '深谷耗电量', minWidth: 130 }
]

export const inspectionColumns: TableColumn[] = [
  { prop: 'powerStationName', label: '电站', minWidth: 150 },
  { prop: 'deviceCode', label: '设备编号', minWidth: 120 },
  { prop: 'deviceName', label: '设备名称', minWidth: 140 },
  { prop: 'inspectionStartTime', label: '开始时间', minWidth: 170 },
  { prop: 'inspectionEndTime', label: '结束时间', minWidth: 170 },
  { prop: 'downtime', label: '时长', minWidth: 100 },
  { prop: 'inspectionStaff', label: '人员', minWidth: 110 },
  { prop: 'inspectionType', label: '类型', type: 'tag', minWidth: 110 }
]

export const sparePartsColumns: TableColumn[] = [
  { prop: 'code', label: '编号', minWidth: 120 },
  { prop: 'name', label: '名称', minWidth: 150 },
  { prop: 'specs', label: '规格型号', minWidth: 140 },
  { prop: 'amount', label: '库存数量', minWidth: 110 },
  { prop: 'location', label: '库存地点', minWidth: 130 },
  { prop: 'movementDate', label: '出入库日期', minWidth: 130 },
  { prop: 'remark', label: '备注', minWidth: 160 }
]

export const deviceTypeColumns: TableColumn[] = [
  { prop: 'name', label: '设备类型名称', minWidth: 150 },
  { prop: 'description', label: '描述', minWidth: 220 },
  { prop: 'indexTemplateItems', label: '点位模板数', minWidth: 120, formatter: row => String(Array.isArray(row.indexTemplateItems) ? row.indexTemplateItems.length : 0) }
]

export const electricitySettingColumns: TableColumn[] = [
  { prop: 'beginTime', label: '开始时间', minWidth: 120 },
  { prop: 'endTime', label: '截止时间', minWidth: 120 },
  { prop: 'remark', label: '备注', minWidth: 180 },
  { prop: 'createTime', label: '创建时间', minWidth: 170 }
]

export const qualitySearchFields: SearchField[] = [
  { prop: 'powerStationId', label: '电站ID', placeholder: '必填：电站ID' },
  { prop: 'deviceId', label: '电表ID', placeholder: '必填：电表ID' },
  timeTypeField,
  { prop: 'timeCode', label: '时间编码', placeholder: '如 2026-05-02' }
]
