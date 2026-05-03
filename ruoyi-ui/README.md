# ruoyi-ui

智碳光伏管理系统 Vue3 Web 管理端，连接现有 RuoYi/Spring Boot 后端，不修改后端 API 契约。

## 技术栈

- Vue 3 + Vite + TypeScript
- Element Plus + `@element-plus/icons-vue`
- Vue Router + Pinia
- Axios
- ECharts
- Vitest + Playwright smoke test

## 开发流程

```bash
cd ruoyi-ui
npm install
npm run dev
```

默认开发地址：`http://localhost:5173`。

后端开发环境按仓库根目录文档启动，dev profile 端口为 `9050`：

```bash
mvn -pl ruoyi-admin -am -DskipTests package
redis-server --save "" --appendonly no --port 6379
java -jar ruoyi-admin/target/ruoyi-admin.jar --spring.profiles.active=dev
```

当前 dev profile 会连接 `127.0.0.1:6379`，启动后端前需要本地 Redis 可用。仓库内 H2 初始化脚本已补齐 pvadmin 基础业务表和少量演示数据，便于前端联调电站、设备、告警、点检、备品备件和峰平谷配置页面。

## 后端代理

`.env.development` 默认配置：

```bash
VITE_APP_BASE_API=/dev-api
```

`vite.config.ts` 将 `/dev-api` 代理到 `http://localhost:9050`，移除 `/dev-api` 前缀后转发给 RuoYi 后端。开发代理会把浏览器请求的 `Origin` 重写为后端 origin，避免本地 `5173 -> 9050` 联调时登录 POST 被后端 CORS 链路挂起。

生产构建默认：

```bash
VITE_APP_BASE_API=/prod-api
```

部署时可由网关或 Nginx 将 `/prod-api` 转发到后端服务。

## 构建与测试

```bash
npm run build
npm run test
npm run test:e2e
```

Playwright smoke test 会启动 Vite dev server，并 mock RuoYi 关键接口验证登录页、首页和一个二级页面可访问。

## 功能范围

- RuoYi 标准登录、验证码、Token 存储、Axios 拦截器、401 退出。
- `/getInfo` 用户信息加载和 `/getRouters` 动态菜单读取；可识别的后端光伏菜单优先合并，并补齐后端缺失的本地光伏业务菜单，未知后端菜单不展示为不可用入口。
- 首页总览、实时监测、统计分析、尖峰平谷、电能质量、智能报警、运维管理全菜单页面。
- 桌面、平板、手机响应式布局；手机端侧栏以抽屉展示。
- 表格页包含搜索、重置、分页、刷新、详情入口和禁用态编辑入口。

## Known Gaps

- 默认开发登录账号按当前 H2 初始化数据使用 `admin/admin123`。
- 首页“当前功率”“月发电量”没有在现有首页聚合接口中发现直接字段，界面保留指标位并显示空态，可后续由后端扩展聚合接口或前端按具体电站/设备接口汇总。
- 写操作表单未启用；后端存在部分新增/编辑/删除接口，但本轮不擅自推断复杂表单契约，统一以只读和禁用态按钮呈现。
- 电能质量接口要求明确 `powerStationId`、`deviceId`、`timeType`、`timeCode`，页面默认用 `-1` 保持可打开；H2 演示数据没有覆盖 `_PW`、`_UA`、`_UB`、`_UC`、`_IA`、`_IB`、`_IC` 等电能质量点位编码，实际查询需用户输入有效 ID 并接入采集数据。
- H2 演示数据只覆盖关键联调链路；真实生产统计、实时采集、电能质量等接口仍依赖外部采集数据源返回业务数据。
