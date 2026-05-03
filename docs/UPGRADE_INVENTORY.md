# 升级前业务盘点（路线 A：SB2.5+JDK8 → SB4+JDK17 + 官方 RuoYi-Vue3）

> 升级目标分支：`upgrade/ruoyi-vue3-sb4`
> 基线 commit：`b4d3702`（baseline 快照）
> 后端基线：RuoYi 3.9.1 / Spring Boot 2.5.15 / JDK 1.8 / 自研 ruoyi-ui (Vue 3.5)
> 后端目标：RuoYi 3.9.2 / Spring Boot 4.0.3 / JDK 17 / 官方 RuoYi-Vue3

## 一、备份清单（.preserve/）

| 路径 | 大小 | 文件数 | 用途 |
|---|---|---|---|
| `.preserve/pvadmin-src` | 832K | 161 | pvadmin domain/mapper/service/influxdb，下阶段迁回 |
| `.preserve/pvadmin-controllers` | — | 13 | pvadmin Controller 层（在 `web/controller/pvadmin/`） |
| `.preserve/weixin-src` | 76K | 16 | 微信公众平台业务包（`web/weixin/mp/...`） |
| `.preserve/admin-resources` | 68K | — | application*.yml + i18n + mybatis + logback + schema/data.sql |
| `.preserve/ruoyi-ui-old` | 388K | 60 | 自研前端工程（不含 node_modules/dist） |

## 二、后端业务包结构

### 2.1 `ruoyi-system/.../pvadmin/`（161 个 .java）

| 子包 | 文件数 | 说明 |
|---|---|---|
| `domain/dto` | 28 | 入参 DTO |
| `domain/entity` | 17 | 实体（@TableName，对应 MyBatis-Plus 表） |
| `domain/enums` | 3 | 枚举（如设备类型、报警等级） |
| `domain/model` | 13 | 业务模型 |
| `domain/vo` | 42 | 出参 VO |
| `mapper` | 17 | MyBatis Mapper 接口 |
| `service` | 19 | Service 接口（IxxxService + RealtimeDatabaseService） |
| `service/impl` | 19 | Service 实现 |
| `influxdb` | 3 | InfluxDBRepository / GroupTimeType / Quality |

### 2.2 `ruoyi-admin/.../web/controller/pvadmin/`（13 个 Controller）

```
PowerStationController        电站
DeviceController              设备
DeviceTypeController          设备类型
DeviceInspectionController    设备点检
SparePartsController          备品备件
SparePartsRecordController    备品备件出入库记录
InventoryLocationController   库位
RealTimeController            实时数据
StatisticsAnalysisController  统计分析
ElectricityDataItemController 电能数据项
ElectricityTypeSettingController 峰平谷配置
AlarmController               报警
WXController                  微信小程序订阅
```

### 2.3 `ruoyi-admin/.../web/weixin/mp/`（16 个 .java）

```
aes/        WXBizMsgCrypt + AesException + ByteGroup + SHA1 + PKCS7Encoder + XMLParse
common/     WXCommonConst + WXRedisCacheConst
exception/  WXServerException
request/    SendMsgRequest + WXMsgObject
response/   AccessTokenResponse + Code2SessionResponse + WXBaseResponse
service/    IWeChatService + impl/WeChatService
```

## 三、前端业务页面（自研 ruoyi-ui）

### 3.1 `ruoyi-ui/src/views/`（21 个 .vue，全部为 pvadmin 业务页）

| 模块目录 | 页面 | 后端 Controller |
|---|---|---|
| `auth/` | LoginView | （RuoYi 标准登录） |
| `dashboard/` | HomeView | PowerStation + Alarm + StatisticsAnalysis 综合 |
| `realtime/` | StationRealtimeView, DeviceRealtimeView, RealTimeDataView | RealTimeController |
| `analysis/` | PowerStationStatsView, DeviceStatsView, SameCompareView, LoopCompareView | StatisticsAnalysisController |
| `peak-valley/` | PeakValleyChartView, PeakValleyReportView | ElectricityTypeSettingController + StatisticsAnalysisController |
| `power-quality/` | LoadAnalysisView, ThreePhaseView, PowerFactorView | RealTimeController（getLoadAnalysisDetail / getThreePhaseUnbalanceAnalysisDetail / getPowerFactorAnalysis） |
| `alarm/` | AlarmView | AlarmController |
| `operation/` | PowerStationManageView, DeviceManageView, DeviceTypeManageView, InspectionManageView, ElectricityTypeSettingView, SparePartsManageView | PowerStation/Device/DeviceType/DeviceInspection/ElectricityTypeSetting/SpareParts Controllers |

### 3.2 `ruoyi-ui/src/api/`

| 文件 | 行数 | 说明 |
|---|---|---|
| `auth.ts` | 35 | 登录/getInfo/getRouters/captcha（已对齐 RuoYi 标准接口）|
| `pv.ts` | 34 | 光伏业务 API 包装（getList/getDetail 通用 + 多个具名方法）|

### 3.3 其它前端结构

```
src/
  components/   通用组件（自研，需评估是否能复用官方）
  config/       前端配置
  layouts/      布局（自研，将整体被官方 layout 替换）
  router/       index.ts + staticRoutes.ts + staticRoutes.test.ts（自研静态路由，将改为官方动态路由 getRouters）
  stores/       app.ts + auth.ts（Pinia，将改为官方 user/permission/app/dict store）
  utils/        含自研 request 封装（将整体替换为官方 utils/request.js）
  types/        TS 类型（如 RuoYiResponse / BackendRoute / QueryParams）
```

## 四、application*.yml 中的 ZhiTan 自定义配置块

> 这些块在阶段 2 整包覆盖框架后必须**手动合回**到新的 application*.yml，否则功能丢失。

### 4.1 dev / prod 共有的 ZhiTan 自定义块

| 块 | 说明 | dev 行 | prod 行 |
|---|---|---|---|
| `server.port: 9050` | 自定义端口（官方默认 8080） | 4 | — |
| `influxdb:` | host/token/org/bucket/measurement | 235 | 222 |
| `wx:` | 微信小程序 appid/secret/token/encodingAesKey/page/template_id/env_version | 242 | 229 |
| `alarm.offline:` | 离线报警阈值（小时） | 252 | 239 |
| `spring.datasource` (dev) | H2 内存库（MODE=MySQL） + schema.sql/data.sql | 51– | — |
| `mybatis-plus:` | 全局配置（驼峰、自动填充等） | 200 | — |

### 4.2 注意事项

- dev profile 的 H2 自动初始化逻辑（`schema.sql` + `data.sql`）需保留
- prod profile 的 InfluxDB / WX 配置可能含真实凭据，迁移时勿截图勿外传
- `logback.xml`（不是官方常用的 `logback-spring.xml`）：保留本地版本以维持当前日志路径

## 五、阶段 1 之后 Codex 需要重点关注

1. **后端整包覆盖（阶段 2）前**，必须确认 `.preserve/` 内的 4 个目录完整存在（已 ✅）
2. **pvadmin Controller 迁回（阶段 3）时**，要从 `.preserve/pvadmin-controllers` 而非 staging 路径取，并放回 `ruoyi-admin/src/main/java/com/ruoyi/web/controller/pvadmin/`
3. **WX 微信包迁回（阶段 3）时**，目标路径仍为 `ruoyi-admin/src/main/java/com/ruoyi/web/weixin/`（不是 `controller/weixin`）
4. **InfluxDB 客户端**：当前 pom 未列出版本，需在阶段 2 检查传递依赖；若使用旧 `influxdb-java` 1.x 客户端，建议升到 `influxdb-client-java` 6.x 以兼容 JDK 17
5. **自研 ruoyi-ui 已对齐 RuoYi 标准接口**（auth.ts 调用 `/captchaImage` `/login` `/getInfo` `/getRouters`），后端阶段 4 接口冒烟应直接通过
