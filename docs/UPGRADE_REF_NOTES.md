# 官方参考蓝本笔记（RuoYi-Vue 3.9.2 / RuoYi-Vue3 v3.9.2）

> 蓝本路径（不入工作树）：
> - `../RuoYi-Vue-ref/`   → 后端蓝本（SB4 + JDK17）
> - `../RuoYi-Vue3-ref/`  → 前端蓝本（Vue 3.5）

## 一、后端版本对照（pom.xml）

| 依赖 | ZhiTan 当前 | 官方目标 | 影响 |
|---|---|---|---|
| ruoyi.version | 3.9.1 | **3.9.2** | 业务代码无需改 |
| spring-boot | 2.5.15 | **4.0.3** | ⚠️ 跨大版本，jakarta + Security6 + autoconfig |
| java.version | 1.8 | **17** | JDK 升级 |
| mybatis-spring-boot | （自带 SB2.5）| **4.0.1** | starter 包名/接口签名小变 |
| pagehelper-spring-boot | 1.4.7 | **2.1.1** | API 不变，`PageHelper.startPage()` 兼容 ✅ |
| druid | 1.2.27 | **1.2.28** | 小升 |
| fastjson2 | 2.0.60 | **2.0.61** | 小升 |
| oshi | 6.9.1 | **6.10.0** | 小升 |
| Swagger 体系 | springfox 3.0.0 | **springdoc-openapi 3.0.2** | ⚠️ 注解全替换（见下） |
| kaptcha | 2.3.3 | 2.3.3 | 不变 |
| poi | 4.1.2 | 4.1.2 | 不变 |
| jjwt | 0.9.1 | **0.9.1** | ✅ 不变，**TokenService 不需要重写**（关键好消息） |
| spring-security | 5.7.14 | （SB4 自带 6.x） | ⚠️ SecurityConfig 必须重写 |

## 二、必须重写的代码点（按文件）

### 2.1 SecurityConfig（参考 `../RuoYi-Vue-ref/ruoyi-framework/.../config/SecurityConfig.java`，128 行）

官方 3.9.2 已全面用 Spring Security 6 lambda DSL：

```java
@Bean
protected SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
    return httpSecurity
        .csrf(csrf -> csrf.disable())
        .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(requests -> { ... })
        .addFilterBefore(authenticationTokenFilter, UsernamePasswordAuthenticationFilter.class)
        .addFilterBefore(corsFilter, JwtAuthenticationTokenFilter.class)
        .addFilterBefore(corsFilter, LogoutFilter.class)
        .build();
}
```

**操作**：阶段 2 整包覆盖时，官方 SecurityConfig 会直接落到 `ruoyi-framework/`。如果 ZhiTan 自己加过放行 URL（如 `/wx/**`、`/realtime/**` 给小程序匿名访问），需要在阶段 3 把这些路径追加到新 SecurityConfig 的 `permitAll()` 段。

### 2.2 Springfox → Springdoc 注解全替换（pvadmin 13 个 Controller + DTO/VO）

| 旧（springfox） | 新（springdoc / OpenAPI 3） |
|---|---|
| `import io.swagger.annotations.*` | `import io.swagger.v3.oas.annotations.*`（Operation/Parameter 等）+ `io.swagger.v3.oas.annotations.tags.Tag` + `io.swagger.v3.oas.annotations.media.Schema` |
| `@Api(tags = "X")` | `@Tag(name = "X")` |
| `@ApiOperation("X")` | `@Operation(summary = "X")` |
| `@ApiModel` | `@Schema` |
| `@ApiModelProperty("X")` | `@Schema(description = "X")` |
| `@ApiImplicitParam(name=..., value=...)` | `@Parameter(name=..., description=...)` |
| `@ApiImplicitParams({...})` | 多个 `@Parameter` 直接堆叠 |

阶段 3 需要在 `pvadmin/` 和 `weixin/` 范围内做精确替换；不要全仓 sed，避免误伤。

### 2.3 javax → jakarta（仅业务代码）

阶段 2 整包覆盖框架后，业务代码里的 `javax.*` import 需要替换：

```
javax.servlet.*       → jakarta.servlet.*
javax.validation.*    → jakarta.validation.*
javax.annotation.{PostConstruct,PreDestroy,Resource} → jakarta.annotation.*
javax.persistence.*   → jakarta.persistence.*
javax.mail.*          → jakarta.mail.*
javax.ws.rs.*         → jakarta.ws.rs.*
```

保留不变：`javax.crypto.*` `javax.sql.*` `javax.xml.*` `javax.imageio.*`（JDK 自带）。

## 三、前端版本对照（package.json）

| 依赖 | ZhiTan 当前 (自研) | 官方 RuoYi-Vue3 v3.9.2 | 备注 |
|---|---|---|---|
| vue | 3.5.13 | **3.5.26** | 同主线 |
| vue-router | 4.5.0 | **4.6.4** | 兼容 |
| pinia | 2.3.0 | **3.0.4** | 大版本，store 写法基本兼容 |
| element-plus | 2.9.3 | **2.13.1** | 兼容 |
| vite | 6.0.7 | **6.4.1** | 兼容 |
| axios | 1.7.9 | **1.13.2** | 兼容 |
| echarts | 5.5.1 | **5.6.0** | 业务页直接复用 ✅ |
| **TypeScript** | ✅ 5.7.2 | ❌ 无（纯 JS） | ⚠️ 见下 |
| 额外 deps（官方有，ZhiTan 没有）| — | `@vueuse/core 14.1.0`、`js-cookie 3.0.5`、`jsencrypt 3.3.2`、`nprogress 0.2.0`、`fuse.js 7.1.0`、`file-saver 2.0.5`、`vue-cropper 1.1.1`、`vuedraggable 4.1.0`、`@vueup/vue-quill 1.2.0`、`clipboard 2.0.11`、`js-beautify 1.15.4` | 阶段 4 自动随官方壳引入 |

### ⚠️ TypeScript 选择题

官方 RuoYi-Vue3 主分支是**纯 JS**。README 提到有独立的 `RuoYi-Vue3-TypeScript` 分支（`https://gitcode.com/yangzongzhuan/RuoYi-Vue3/tree/typescript`）。

| 选项 | 优 | 劣 |
|---|---|---|
| **A. 用主分支 JS（推荐）** | 社区主线、文档/插件最齐全、出 bug 解决最快 | ZhiTan 已有 TS 业务页需手动转 JS（机械工作） |
| B. 用 typescript 分支 | 保持 TS，无需转换 | 主线更新慢 1-2 周；社区材料少；当前 typescript 分支版本号未必同步 3.9.2 |

**默认走 A**，除非阶段 4 执行前明确改为 B。

## 四、前端关键约定（业务页迁移时必须遵守）

### 4.1 Token 存储

```js
// src/utils/auth.js
const TokenKey = 'Admin-Token'
Cookies.get/set/remove(TokenKey)
```
不是 localStorage、不是 Pinia 持久化插件。

### 4.2 axios 实例（src/utils/request.js）

- baseURL = `import.meta.env.VITE_APP_BASE_API`（dev 是 `/dev-api`）
- 请求拦截器自动加 `Authorization: Bearer ${token}`
- 通过请求 header `isToken: false` 跳过 token（登录/验证码用）
- 通过请求 header `repeatSubmit: false` 关闭防重复提交
- 业务 API 必须 `import request from '@/utils/request'` 调用，**不要再自封装 axios**

### 4.3 路由（src/permission.js）

- 启动后调用 `getRouters` 拉取**后端动态菜单**，与 `constantRoutes` 合并
- 未登录路径白名单：`['/login', '/register']`
- ZhiTan 当前自研用静态路由 `staticRoutes.ts`，迁移后将作废，改为通过 SQL 注入 `sys_menu` 表

### 4.4 登录加密说明

`jsencrypt` 仅用于"记住密码"时把密码 RSA 加密**存到 Cookie**，登录请求本身仍是明文 POST。后端**不需要**配置 RSA 公私钥。

### 4.5 后端代理

dev 环境 `vite.config.js` 默认 `proxy: { '/dev-api': { target: 'http://localhost:8080' } }`，**ZhiTan 后端是 9050 端口**，阶段 4 必须改 target 为 `http://localhost:9050`。

## 五、阶段 2-3 执行清单（可直接对标）

- [ ] 阶段 2：rsync 整包覆盖 `ruoyi-{admin,framework,system,common,quartz,generator}/`、根 `pom.xml`
- [ ] 阶段 2：合并 `application*.yml` 自定义块（端口 9050、influxdb、wx、alarm、H2、mybatis-plus）
- [ ] 阶段 3：`mv` 业务包回原位（pvadmin-src / pvadmin-controllers / weixin-src）
- [ ] 阶段 3：`javax.* → jakarta.*` 替换（仅 pvadmin + weixin 范围）
- [ ] 阶段 3：springfox 注解 → springdoc 注解
- [ ] 阶段 3：检查 InfluxDB 客户端版本（若是老 `influxdb-java` 1.x 需升 6.x）
- [ ] 阶段 3：检查微信 SDK 是否 jakarta 兼容（如果用 `weixin-java-mp` 升 4.6.x）
- [ ] 阶段 3：把 ZhiTan 原 SecurityConfig 的自定义放行 URL 追加到新 SecurityConfig
- [ ] 阶段 4：`vite.config.js` proxy.target 改为 `http://localhost:9050`
