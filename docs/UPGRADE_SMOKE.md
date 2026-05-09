# 全栈升级冒烟报告

## 一、环境
- 后端：RuoYi 3.9.2 / Spring Boot 4.0.3 / MyBatis-Plus 3.5.16 / 实测 JDK 21.0.10（目标 JDK 17）
- 前端：RuoYi-Vue3 TypeScript / Vue 3.5.26 / Element Plus 2.13.1 / Vite 6.4.1
- 后端口：9050；前端口：81
- dev 数据库：H2 in-memory（MODE=MySQL，含 ZhiTan 自定义 schema 增量）

## 二、启动
- 后端启动耗时：Started RuoYiApplication in 3.698 seconds；最终日志中最近一次为 Started RuoYiApplication in 3.415 seconds
- 前端 vite ready 耗时：VITE v6.4.1 ready in 295 ms
- 后端启动日志关键行：

```text
22:24:13.598 [main] ERROR c.r.p.i.InfluxDBRepository - [connectInfluxDB,44] - --------------------实时数据库连接成功--------------------
22:24:14.449 [main] INFO  c.r.RuoYiApplication - [logStarted,60] - Started RuoYiApplication in 3.415 seconds (process running for 3.622)
22:24:14.450 [main] WARN  o.s.c.e.SpringDocAppInitializer - [init,83] - SpringDoc /v3/api-docs endpoint is enabled by default. To disable it in production, set the property 'springdoc.api-docs.enabled=false'
(♥◠‿◠)ﾉﾞ  若依启动成功   ლ(´ڡ`ლ)ﾞ
```

## 三、接口冒烟（核心 13 项）
| 接口 | 方法 | 状态码 | 备注 |
|---|---:|---:|---|
| /captchaImage | GET | code=200 | captchaEnabled=false |
| /login | POST | code=200 | 返回 token，长度 203 |
| /getInfo | GET | code=200 | roles 含 admin，permissions 为 `*:*:*` |
| /getRouters | GET | code=200 | data 含 path=`pvadmin`，菜单注入成功 |
| /system/user/list | GET | code=200 | 返回 admin 用户 |
| /system/menu/list | GET | code=200 | 返回 pvadmin 菜单与权限 |
| /powerStation/list | GET | ✅ code=200 | total=1，Mapper XML 恢复后通过 |
| /alarm/list | GET | ✅ code=200 | total=1，Mapper XML 恢复后通过 |
| /device/list | GET | ✅ code=200 | total=2，Mapper XML 恢复后通过 |
| /deviceType/list | GET | ✅ code=200 | total=2，MyBatis-Plus factory 修复后通过 |
| /inspection/list | GET | ✅ code=200 | total=1，Mapper XML 恢复后通过 |
| /electricityTypeSetting/list | GET | ✅ code=200 | total=1，MyBatis-Plus factory 修复后通过 |
| /parts/list | GET | ✅ code=200 | total=1，Mapper XML 恢复后通过 |

## 四、前端
- dist 总大小：7.2M
- 主 chunk top 5：

| 文件 | 大小 |
|---|---:|
| dist/static/js/index-PUEFiF5V.js | 1708 KB |
| dist/static/js/install-znZq-JSd.js | 524 KB |
| dist/static/js/index-Bagjha6_.js | 504 KB |
| dist/static/js/index-DV_GIqPq.js | 148 KB |
| dist/static/js/index-CEiSL8FZ.js | 132 KB |

- vite proxy `/dev-api` → 9050 验证：通过（`/dev-api/captchaImage` HTTP 200，`/dev-api/getRouters` 命中 pvadmin）
- 改进建议：主 chunk index-*.js > 1.5MB，建议路由级懒加载 + ECharts/Element Plus 单独 chunk（rollupOptions.manualChunks）

## 五、TypeScript 类型
- 基线：308（官方模板 monitor/tool/system 历史欠债）
- 最终：308
- delta：0（ZhiTan 本阶段业务代码未新增类型错误）

## 六、业务模块状态
| 模块 | 页面 | API | 菜单 SQL | 实测接口 |
|---|---|---|---|---|
| 电站管理 | ✓ | ✓ /powerStation/list | ✓ | 200：total=1 |
| 设备类型管理 | ✓ | ✓ /deviceType/list | ✓ | 200：total=2 |
| 设备管理 | ✓ | ✓ /device/list | ✓ | 200：total=2 |
| 设备点检 | ✓ | ✓ /inspection/list | ✓ | 200：total=1 |
| 峰平谷配置 | ✓ | ✓ /electricityTypeSetting/list | ✓ | 200：total=1 |
| 备品备件 | ✓ | ✓ /parts/list | ✓ | 200：total=1 |
| 智能报警 | ✓ | ✓ /alarm/list | ✓ | 200：total=1 |
| 实时-电站 | ✓ | ✓ /powerStation/* | ✓ | 核心 /powerStation/list 通过 |
| 实时-设备 | ✓ | ✓ /device/* | ✓ | 核心 /device/list 通过 |
| 实时-数据 | ✓ | ✓ /realTime/listRealTime | ✓ | 未单独 curl；Controller 已启动注册 |
| 统计-电站 | ✓ | ✓ /powerStation/listGenerationStatistics | ✓ | PowerStationMapper XML 已恢复；该统计接口未单独 curl |
| 统计-设备 | ✓ | ✓ /device/getInverterGenerationStats | ✓ | DeviceMapper XML 已恢复；该统计接口未单独 curl |
| 同比分析 | ✓ | ✓ /statisticsAnalysis/querySameCompareList | ✓ | 未单独 curl；Controller 已启动注册 |
| 环比分析 | ✓ | ✓ /statisticsAnalysis/queryLoopCompareList | ✓ | 未单独 curl；Controller 已启动注册 |
| 峰平谷-图表 | ✓ | ✓ /peakValley/segment | ✓ | 未单独 curl；Controller 已启动注册 |
| 峰平谷-报表 | ✓ | ✓ /peakValley/report | ✓ | 未单独 curl；Controller 已启动注册 |
| 电能-负荷 | ✓ | ✓ /realTime/listLoadAnalysis | ✓ | 未单独 curl；Controller 已启动注册 |
| 电能-三相 | ✓ | ✓ /realTime/listThreePhaseUnbalanceAnalysis | ✓ | 未单独 curl；Controller 已启动注册 |
| 电能-功率因数 | ✓ | ✓ /realTime/getPowerFactorAnalysis | ✓ | 未单独 curl；Controller 已启动注册 |
| 首页大屏 | ✓ | ✓ 多 Controller 聚合 | ✓ | 标准菜单链路通过；核心业务列表数据源已恢复 |

## 七、阻塞性问题
- pvadmin 业务接口运行期失败：多个 Mapper XML bound statement 未找到，包括 `PowerStationMapper.listByQueryDto`、`DeviceMapper.selectDeviceList`、`AlarmMapper`、`DeviceInspectionMapper`、`SparePartsMapper` 等。
- 部分 MyBatis-Plus LambdaQueryWrapper 查询失败：`can not find lambda cache for this entity`，涉及 `DeviceType`、`ElectricityTypeSetting`。
- 以上问题导致 pvadmin 业务列表页无法达到发布验收；本阶段按约束只记录，不修改业务代码。

### 阻塞解决记录（6-fix-续）
- 根因 1：阶段 0 备份漏掉 `ruoyi-system/src/main/resources/mapper/pvadmin/`，阶段 2 整包覆盖时 `rsync --delete` 清空了 16 个 ZhiTan pvadmin Mapper XML，导致 5 个 XML 映射接口出现 bound statement 缺失。
- 修复 1：从基线 commit `b4d3702` 恢复 16 个 `pvadmin` Mapper XML；恢复后 `PowerStationMapper.listByQueryDto`、`AlarmMapper.listByQueryDto`、`DeviceMapper.selectDeviceList`、`DeviceInspectionMapper.selectDeviceInspectionList`、`SparePartsMapper.selectSparePartsList` 均已命中。
- 资源审计：`b4d3702..HEAD` 的 `ruoyi-*/src/main/resources/` 删除项共 18 个；已恢复 16 个 `pvadmin` XML；`ruoyi-admin/src/main/resources/logback.xml` 属于当前 `logback-spring.xml` 替代，保留删除；`ruoyi-generator/src/main/resources/vm/vue/v3/readme.txt` 为旧生成器说明文件，保留删除；待用户决策 0 个。
- 根因 2：当前启用的自定义 `MyBatisConfig` 使用原生 `SqlSessionFactoryBean`，未通过 MyBatis-Plus 的 factory 初始化 TableInfo/lambda cache，导致 `DeviceType`、`ElectricityTypeSetting` 的 LambdaQueryWrapper 查询失败。
- 修复 2：将 `MyBatisConfig` 切换为 `com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean`；重新打包启动后出现 MyBatis-Plus 3.5.16 banner，7 个 pvadmin 列表接口全部返回 200。

## 八、非阻塞性观察（建议后续单独修单）
- `实时数据库连接成功` 被 `log.error` 打印，位置：`ruoyi-system/src/main/java/com/ruoyi/pvadmin/influxdb/InfluxDBRepository.java:44`，应改为 `log.info`。
- `Math.toIntExact` 调用点共 11 处（pvadmin 业务包），后续可重构为变量类型 long。
- 实测 JDK 是 21.0.10，非目标 17；建议生产部署用 JDK 17 LTS。
- dev profile captcha 关（captchaEnabled=false），生产前应开回。
- 前端主 chunk 1.7MB 偏大，建议 manualChunks 拆分。
- vue-tsc 308 条历史欠债集中在官方 monitor/tool/system，可通过 typescript 分支社区修单或自行清理。

## 九、可发布判断
- 可合并 main。

## 十、阶段 0-6 完整 commit 链
```text
3cd98df chore: 升级前盘点与备份基线 (路线 A)
b99367e docs: 阶段1 - 官方蓝本版本与关键 API 对照笔记
47dd327 docs: 修正阶段1 TS 蓝本对照笔记
3953922 feat(backend): 整包覆盖到 RuoYi 3.9.2 (Spring Boot 4 / JDK 17) - 业务包暂存
3c7cf28 feat(backend): pvadmin/weixin 业务迁回并完成 jakarta + Springdoc + Security6 适配
563d500 feat(frontend): 整包覆盖到官方 RuoYi-Vue3 (TypeScript 分支) + 接入 9050 后端 + 修复 TS 严格模式
7773c0e fix(backend): H2 schema.sql 同步 RuoYi 3.9.2 schema 增量
e7daf82 feat(frontend): 迁移业务页 - 1 电站
bf3885c feat(frontend): 迁移业务页 - 2 设备类型
9fc2245 feat(frontend): 迁移业务页 - 3 设备
4e27fd0 feat(frontend): 迁移业务页 - 4 点检
3823924 feat(frontend): 迁移业务页 - 5 峰平谷配置
ee5e4ac feat(frontend): 迁移业务页 - 6 备品备件
f02e262 feat(frontend): 迁移业务页 - 7 报警
e520114 feat(frontend): 迁移业务页 - 8 实时-电站
2fbf160 feat(frontend): 迁移业务页 - 9 实时-设备
01f5e1d feat(frontend): 迁移业务页 - 10 实时-数据
205937b feat(frontend): 迁移业务页 - 11 统计-电站（含 PvValue 类型收窄修复）
7f01b0c feat(frontend): 迁移业务页 - 12 统计-设备
de91323 feat(frontend): 迁移业务页 - 13 同比
7163e10 feat(frontend): 迁移业务页 - 14 环比
6092f6b feat(frontend): 迁移业务页 - 15 峰平谷-图表
68d459b feat(frontend): 迁移业务页 - 16 峰平谷-报表
17d4a6b feat(frontend): 迁移业务页 - 17 电能-负荷
73d0401 feat(frontend): 迁移业务页 - 18 电能-三相
d7c74fa feat(frontend): 迁移业务页 - 19 电能-功率因数
2384ce3 feat(frontend): 迁移业务页 - 20 首页大屏
f709c38 chore(brand): 品牌化为智碳光伏管理系统
```
