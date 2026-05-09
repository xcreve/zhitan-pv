# 官方参考蓝本笔记（RuoYi-Vue 3.9.2 / RuoYi-Vue3 TypeScript 分支）

> 蓝本路径（不入工作树）：
> - `../RuoYi-Vue-ref/` 后端蓝本（SB4 + JDK17）
> - `../RuoYi-Vue3-ref/` 前端 JS 主线（备查）
> - `../RuoYi-Vue3-TS-ref/` **前端 TS 分支（本项目使用）**

## 一、后端版本对照（pom.xml）

| 依赖 | ZhiTan 当前 | 官方目标 | 影响 |
|---|---:|---:|---|
| ruoyi.version | 3.9.1 | 3.9.2 | ✅ RuoYi 小版本升级 |
| spring-boot | 2.5.15 | 4.0.3 | ⚠️ 跨大版本，Security 6、Jakarta、自动配置均需跟随官方 |
| java.version | 1.8 | 17 | ⚠️ JDK 基线升级 |
| mybatis-spring-boot | 未独立声明 | 4.0.1 | ⚠️ 官方新增显式版本，阶段 2 以蓝本 pom 为准 |
| pagehelper-spring-boot | 1.4.7 | 2.1.1 | ⚠️ Starter 版本升级，业务分页调用需冒烟 |
| druid | 1.2.27 | 1.2.28 | ✅ 小版本升级，官方 artifact 为 `druid-spring-boot-4-starter` |
| fastjson2 | 2.0.60 | 2.0.61 | ✅ 小版本升级 |
| oshi | 6.9.1 | 6.10.0 | ✅ 小版本升级 |
| Swagger 体系 | springfox 3.0.0 | springdoc-openapi 3.0.2 | ⚠️ 业务注解要从 springfox 改到 springdoc |
| kaptcha | 2.3.3 | 2.3.3 | ✅ 不变 |
| poi | 4.1.2 | 4.1.2 | ✅ 不变 |
| jjwt | 0.9.1 | 0.9.1 | ✅ 不变，官方 `TokenService` 仍使用 `io.jsonwebtoken.Jwts` |
| spring-security | 5.7.14 | SB4 BOM 管理 6.x | ⚠️ `SecurityConfig` 必须按官方 Security 6 写法落地 |

实际读取依据：
- ZhiTan 根 `pom.xml`：`ruoyi.version=3.9.1`、`java.version=1.8`、`spring-boot.version=2.5.15`、`pagehelper.boot.version=1.4.7`、`spring-security.version=5.7.14`。
- 官方后端 `../RuoYi-Vue-ref/pom.xml`：`ruoyi.version=3.9.2`、`java.version=17`、`spring-boot.version=4.0.3`、`mybatis-spring-boot.version=4.0.1`、`springdoc.version=3.0.2`、`jwt.version=0.9.1`。

## 二、必须重写的代码点（按文件）

### 2.1 SecurityConfig（位置：`ruoyi-framework/.../config/SecurityConfig.java`）

官方文件行数：128 行。写法为 Spring Security 6 lambda DSL，核心片段如下：

```java
@Bean
protected SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception
{
    return httpSecurity
        .csrf(csrf -> csrf.disable())
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests((requests) -> { ... })
        .addFilterBefore(authenticationTokenFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
}
```

操作建议：阶段 2 整包覆盖会落地官方版本；阶段 3 把 ZhiTan 自定义 permitAll URL 追加进去。当前 ZhiTan 需要特别关注 `/wx/**`、`/wxLogin`、`/captchaImage`、`/login`、dev profile 下 `/h2-console/**` 等放行路径。

### 2.2 Springfox -> Springdoc 注解全替换（pvadmin/weixin 范围）

| 旧（io.swagger.annotations.*） | 新（io.swagger.v3.oas.annotations.*） |
|---|---|
| `@Api(tags = "X")` | `@Tag(name = "X")` |
| `@ApiOperation("X")` | `@Operation(summary = "X")` |
| `@ApiModel` | `@Schema` |
| `@ApiModelProperty("X")` | `@Schema(description = "X")` |
| `@ApiModelProperty(required = true)` | `@Schema(requiredMode = Schema.RequiredMode.REQUIRED)` |
| `@ApiImplicitParam(name = ..., value = ...)` | `@Parameter(name = ..., description = ...)` |
| `@ApiImplicitParams({...})` | 拆为多个 `@Parameter` |
| `@ApiParam(value = "X")` | `@Parameter(description = "X")` |

实际扫描 `.preserve/pvadmin-src` 已发现 `io.swagger.annotations.ApiParam`，阶段 3 不要只替换 Controller，DTO/VO 也要扫描。

### 2.3 javax -> jakarta（仅业务代码）

| 旧 import | 新 import |
|---|---|
| `javax.servlet.*` | `jakarta.servlet.*` |
| `javax.validation.*` | `jakarta.validation.*` |
| `javax.annotation.PostConstruct` | `jakarta.annotation.PostConstruct` |
| `javax.annotation.PreDestroy` | `jakarta.annotation.PreDestroy` |
| `javax.annotation.Resource` | `jakarta.annotation.Resource` |
| `javax.persistence.*` | `jakarta.persistence.*` |

保留不变：`javax.crypto.*`、`javax.sql.*`、`javax.xml.*`、`javax.imageio.*`、`javax.naming.*` 等 JDK/Jakarta 无关包。

实际扫描 `.preserve/pvadmin-src` 已发现 `javax.annotation.Resource` 与 `javax.validation.constraints.*`，阶段 3 需在 `pvadmin` 和 `weixin` 范围做精确替换。

## 三、前端版本对照（package.json，TS 蓝本）

| 依赖 | ZhiTan 当前自研 | 官方 TS 蓝本 | 备注 |
|---|---:|---:|---|
| vue | ^3.5.13 | 3.5.26 | ⚠️ 小版本升级 |
| vue-router | ^4.5.0 | 4.6.4 | ⚠️ 小版本升级 |
| pinia | ^2.3.0 | 3.0.4 | ⚠️ Pinia 大版本升级，store 写法需按官方壳迁移 |
| element-plus | ^2.9.3 | 2.13.1 | ⚠️ 小版本升级 |
| vite | ^6.0.7 | 6.4.1 | ⚠️ 小版本升级 |
| axios | ^1.7.9 | 1.13.2 | ⚠️ 小版本升级 |
| echarts | ^5.5.1 | 5.6.0 | ✅ 业务图表迁移成本低 |
| typescript | ~5.7.2 | 5.6.3 | ⚠️ ZhiTan 当前略高，阶段 4 以官方 TS 蓝本为准 |

官方 TS 蓝本有但 ZhiTan 当前没有的额外 dependencies：

`@vueuse/core 14.1.0`、`js-cookie 3.0.5`、`jsencrypt 3.3.2`、`nprogress 0.2.0`、`fuse.js 7.1.0`、`file-saver 2.0.5`、`vue-cropper 1.1.1`、`vuedraggable 4.1.0`、`@vueup/vue-quill 1.2.0`、`clipboard 2.0.11`、`js-beautify 1.15.4`。

TS 蓝本与 JS 主线依赖对比：`diff -q` 对 `dependencies` 无输出，说明当前拉取版本的 dependencies 一致；TS 蓝本额外体现在 TypeScript、`@vue/tsconfig`、`vue-tsc`、自动导入与类型文件结构。

## 四、前端关键约定（业务页迁移时必须遵守）

### 4.1 Token 存储

位置：`../RuoYi-Vue3-TS-ref/src/utils/auth.ts`

```ts
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken(): string | undefined {
  return Cookies.get(TokenKey)
}
```

迁移要求：阶段 4 不再使用 ZhiTan 自研 `localStorage` token 方案，统一走官方 `Admin-Token` Cookie。

### 4.2 axios 实例（`src/utils/request.ts`）

实际读取到的官方约定：
- `baseURL = import.meta.env.VITE_APP_BASE_API`
- 默认 `Content-Type = application/json;charset=utf-8`
- 请求拦截器自动加 `Authorization: Bearer ${token}`
- `headers.isToken === false` 时跳过 token
- `headers.repeatSubmit === false` 时跳过防重复提交
- GET 请求会把 `params` 转为 query string
- POST/PUT 默认走 session cache 做重复提交拦截
- 下载逻辑内置 `file-saver`

业务 API 迁移要求：直接使用官方 `request`，不要保留 ZhiTan 自研 `src/utils/request.ts` 的另一套响应处理。

### 4.3 路由（`src/permission.ts`）

实际读取到的官方约定：
- 白名单：`['/login', '/register']`
- 登录后如果 `roles.length === 0`，先 `getInfo()`，再 `usePermissionStore().generateRoutes()`
- 动态路由通过 `router.addRoute(route)` 注入
- `getRouters` 位于后续 permission store 链路，不再使用 ZhiTan 自研静态菜单兜底模式

阶段 4 迁移要求：将 ZhiTan 菜单写入后端 `sys_menu`，让官方前端通过 `/getRouters` 渲染。

### 4.4 登录加密说明

`jsencrypt` 在官方前端中用于“记住密码”场景，把密码 RSA 加密后存 Cookie。登录请求本身仍按 `/login` 明文 POST：`username`、`password`、`code`、`uuid`。后端不需要因为阶段 4 前端迁移而新增 RSA 解密。

官方 `src/api/login.ts` 实际约定：
- `/login`：`headers: { isToken: false, repeatSubmit: false }`
- `/captchaImage`：`headers: { isToken: false }`
- `/getInfo`、`/getRouters` 继续沿用 RuoYi 标准接口链路。

### 4.5 后端代理端口陷阱

官方 TS 蓝本 `vite.config.ts`：
- `const baseUrl = 'http://localhost:8080'`
- `VITE_APP_BASE_API = '/dev-api'`
- `/dev-api` proxy target 使用 `baseUrl`
- 另有 springdoc proxy 指向同一 `baseUrl`

ZhiTan 后端 dev 端口是 `9050`，阶段 4 必须把 proxy target 改为 `http://localhost:9050`。阶段 0 中真实浏览器联调还发现本地 RuoYi 后端对 `5173 -> 9050` 的登录 POST 可能因 Origin 挂起，自研前端临时用 dev proxy 重写 Origin；阶段 4 应在官方 Vite proxy 中保留等价处理或确认 SB4 CORS 行为已消除该问题。

## 五、阶段 2-3 执行清单（可直接对标）

- [ ] 阶段 2：rsync 整包覆盖 6 个 `ruoyi-*` 模块 + 根 `pom.xml`
- [ ] 阶段 2：合并 `application*.yml` 自定义块（端口 9050、influxdb、wx、alarm、H2、mybatis-plus）
- [ ] 阶段 3：mv 业务包回原位（按阶段 0 第 5 步的精确路径反向）
- [ ] 阶段 3：`javax.* -> jakarta.*`（仅 pvadmin + weixin 范围）
- [ ] 阶段 3：springfox 注解 -> springdoc 注解
- [ ] 阶段 3：检查 InfluxDB 客户端版本（官方未引入 InfluxDB，ZhiTan 业务需单独决策）
- [ ] 阶段 3：检查微信 SDK 是否 jakarta 兼容（官方未引入微信 SDK，ZhiTan 业务需单独决策）
- [ ] 阶段 3：把 ZhiTan 原 `SecurityConfig` 自定义放行 URL 追加到新 `SecurityConfig`
- [ ] 阶段 4：采用 `../RuoYi-Vue3-TS-ref/` 作为前端壳，迁移 `ruoyi-ui-old/src/views`、`src/api`、业务 components/config
- [ ] 阶段 4：`vite.config.ts` proxy target 改为 `http://localhost:9050`

## 六、官方未覆盖的 ZhiTan 业务依赖

实际 grep 官方后端蓝本 `pom.xml` 与 `ruoyi-*/pom.xml`，未发现 `influxdb`、`weixin-java`、`wx-java`、`me.chanjar`。阶段 3 迁回业务代码后，这两类依赖必须由 ZhiTan 自己在新 SB4/JDK17 基线上选型：

- InfluxDB：检查当前业务包使用的客户端 API；如果仍是老 `influxdb-java` 1.x，需要评估升级到兼容 JDK17/SB4 的版本。
- 微信 SDK：检查 `ruoyi-admin/src/main/java/com/ruoyi/web/weixin` 的实际 SDK import；若使用 `weixin-java-mp`，优先评估 4.6.x 或更高版本的 Jakarta 兼容性。
