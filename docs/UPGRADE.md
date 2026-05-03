# RuoYi-Vue 3.8.6 -> 3.9.1 升级说明

## 目标版本
- 目标：RuoYi-Vue `v3.9.1`（保持 Spring Boot 2.5.15 / JDK8）。

## 关键变更点（本仓库）
1. **依赖与基础版本对齐**
   - 根 `pom.xml` 将 `ruoyi.version` 升级为 `3.9.1`，并对齐 v3.9.1 的依赖版本（Druid、Fastjson2、PageHelper、OSHI、Tomcat、Spring Security、Spring Framework 等）。
   - 增加 Lombok 版本与编译工具链配置，并通过 Enforcer 固定 JDK8 构建环境，避免 javac NoSuchFieldError。
   - `ruoyi-admin` 显式补齐 `commons-codec` 坐标（避免上游依赖缺失导致运行时报错）。
2. **Token / 登录链路对齐**
   - 登录验证码校验与登录信息更新逻辑对齐上游（新增 `updateLoginInfo`，Token claims 增加 `JWT_USERNAME`）。
3. **SecurityFilterChain 与 CORS/Resources 对齐**
   - Security 配置切换为 v3.9.1 的 `SecurityFilterChain` 风格，同时保留业务侧的 `/wxLogin` 与 `/wx/**` 匿名访问白名单。
   - 跨域配置与资源映射保持上游行为（`CorsFilter` 允许携带凭证）。
4. **UserAgent 解析替换**
   - 使用 `yauaa` 替换 `UserAgentUtils` 解析依赖，并新增 `UserAgentUtils` 工具类以与 v3.9.1 行为保持一致。
5. **开发环境启动补齐（dev-only）**
   - 新增 H2 内存库启动通道，`application-dev.yml` 启用 `spring.sql.init.*` 并加载 `schema.sql`/`data.sql`（只对 dev 生效）。
   - dev profile 提供 `wx.*` 占位值，避免开发环境缺少配置导致启动失败。
   - **生产环境**仍保持 MySQL + Druid，`spring.sql.init.*` 不出现在 prod；`wx.*` 需通过外部配置提供真实值。
   - H2 Console 仅在 dev 开启（`/h2-console`），生产环境不启用。

## 升级步骤
1. 确认环境：JDK8 + Maven 3.6+ + MySQL + Redis。
2. 执行 SQL 增量脚本（详见下节）。
3. 重新构建：
   ```bash
   mvn clean package
   ```
4. 启动服务（示例）：
   ```bash
   java -jar ruoyi-admin/target/ruoyi-admin.jar --spring.profiles.active=dev
   ```

## SQL 迁移
- 脚本路径：`sql/upgrade/3.8.6_to_3.9.1.sql`
- 执行顺序：
  1) `sql/upgrade/3.8.6_to_3.9.1.sql`
  2) 若历史未初始化 quartz 表，再执行 `sql/quartz.sql`

### 影响范围
- **仅框架表结构**（`sys_user`、`sys_menu`、`gen_table`）；不涉及业务表。

### 静态可执行性审阅结论
- **执行顺序**：脚本按字段新增顺序执行，彼此独立，无外键/依赖顺序问题。
- **幂等性**：`ALTER TABLE ... ADD COLUMN` 非幂等，重复执行会因字段已存在而失败；仅应在确认未升级过的库执行一次。
- **唯一键冲突风险**：本脚本仅新增列，不新增/更新数据与索引，不会引入唯一键冲突；风险主要在重复执行导致的“列已存在”错误。

### 回滚建议
- 执行前请备份库；如需回滚，请使用备份恢复或回退新增字段。

## 已验证清单
- JDK8 全量构建成功记录（见 `docs/BUILD_LOG.md` 的 2026-01-31 记录）。
- dev(H2) 启动成功，基础鉴权链路（/login、/getInfo、/getRouters、/wxLogin）冒烟通过（见 `docs/SMOKE_TEST.md`）。

## 未验证清单
- 生产环境 MySQL/Redis 启动及真实 wx 配置联调。
- Quartz 定时任务、代码生成器（ruoyi-generator）运行级验证。
- pvadmin 业务接口的完整链路回归。
### 回滚建议
- 执行前请备份库；如需回滚，请使用备份恢复或回退新增字段。



> 实际冒烟验证步骤见 `docs/SMOKE_TEST.md`。
