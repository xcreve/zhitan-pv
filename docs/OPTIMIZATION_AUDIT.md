# 全仓深度复查与优化升级评估（RuoYi v3.9.1）

## 1. 审计范围

本次审计基于当前仓库 `RuoYi 3.9.1` 升级后的代码，覆盖：

- 后端代码质量：`ruoyi-admin`、`ruoyi-framework`、`ruoyi-common`、`ruoyi-system`、`ruoyi-quartz`、`ruoyi-generator`
- 依赖与框架：根 `pom.xml` 与子模块 `pom.xml`
- 配置与环境隔离：`application.yml`、`application-dev.yml`、`application-prod.yml`
- 安全与可维护性：`SecurityConfig`、登录链路、CI / 安全扫描 workflow

> 本次目标是“找问题 + 小修复 + 路线建议”，不重复做升级主线改造。

---

## 2. 发现的问题清单（分级）

### P0（阻塞上线 / 明显错误）

- 未发现阻塞上线级问题。

### P1（高优先级优化）

1. **登录设备信息字段写反（OS / Browser）**
   - 位置：`TokenService#setUserAgent`
   - 现象：将操作系统写入 `browser` 字段、将浏览器写入 `os` 字段。
   - 影响：登录审计数据语义错误，影响运维与安全审计。
   - 处理：已修复（见“已直接修复”）。

2. **验证码比较存在潜在空指针风险**
   - 位置：`SysLoginService#validateCaptcha`
   - 现象：`code.equalsIgnoreCase(captcha)` 在 `code == null` 时可能触发 NPE。
   - 影响：登录流程在异常输入时返回 500，而非业务可控的验证码错误。
   - 处理：已修复（见“已直接修复”）。

3. **操作日志异常处理使用 `printStackTrace`**
   - 位置：`LogAspect#handleLog`
   - 现象：同时 `log.error(...message...)` + `printStackTrace()`，日志不统一。
   - 影响：日志格式不规范，不利于统一采集与告警。
   - 处理：已修复（见“已直接修复”）。

4. **生产配置中包含高风险明文凭据示例**
   - 位置：`application-prod.yml`
   - 现象：MySQL 用户名密码、Druid console 用户名密码仍为明文默认值。
   - 影响：配置泄露风险，且容易误用于真实环境。
   - 建议：短期将敏感项全部改为环境变量占位（见“短期建议”）。

### P2（一般优化建议）

1. **`mybatis` 与 `mybatis-plus` 映射配置重复**
   - 位置：`application.yml`、`application-prod.yml`
   - 现象：`mapperLocations/typeAliasesPackage` 在两套配置重复声明。
   - 影响：维护成本升高，后续修改容易遗漏。
   - 建议：收敛为单一来源（优先 `mybatis-plus`）。

2. **Security 白名单偏宽**
   - 位置：`SecurityConfig`
   - 现象：`/wx/**`、`/druid/**`、swagger 相关路径全量放行。
   - 影响：攻击面扩大，尤其在 prod 未关闭 swagger/druid 时。
   - 建议：按 profile 精细化控制开放范围。

3. **CI 基线可补充**
   - 现状：已有 `ci.yml` 与 `dependency-check.yml`。
   - 建议：补充 dependency-review、SpotBugs/Checkstyle/PMD 之一，形成“编译 + 安全 + 静态质量”闭环。

4. **构建插件版本存在历史留存**
   - 位置：`ruoyi-admin/pom.xml`
   - 现象：`spring-boot-maven-plugin` 使用 `2.1.1.RELEASE`，与当前 BOM `2.5.15` 不一致。
   - 影响：长期维护风险（行为差异/插件特性不一致）。
   - 建议：中期统一插件版本到 BOM 同代。

---

## 3. 已直接修复的问题列表

本次仅修复“低风险、无业务语义变化、无接口变更、无 DB 变更”的问题：

1. 修复 `TokenService#setUserAgent` 的 OS/Browser 字段写入方向。
2. 修复 `SysLoginService#validateCaptcha` 验证码比较空指针风险。
3. 统一 `LogAspect` 异常日志记录方式，去除 `printStackTrace`。

### commit 信息

- commit id: **cd763a5**
- 修改目的：修复登录审计字段错误、提升登录链路健壮性、统一日志规范。
- 风险说明：仅限内部实现细节修正，无 API/协议/数据库结构变化，风险低。

---

## 4. 后续升级路线建议

### 短期建议（低风险可直接做）

1. **敏感配置环境变量化（优先级高）**
   - 将 `application-prod.yml` 的 DB/Redis/token/wx/druid 凭据全部改为 `${ENV_VAR}`。
2. **白名单收敛**
   - 生产禁用 swagger 与 druid，`/wx/**` 仅保留真实回调路径。
3. **补齐 CI 质量门禁**
   - 增加 dependency-review + 一种静态检查（如 SpotBugs）。
4. **清理重复配置**
   - 统一 mybatis/mybatis-plus 重复项，减少配置漂移。

### 中期建议（需评估与计划）

1. **Boot 2.7 路线（建议先做）**
   - 目标：在 Java 8/11 范围内，先完成到 2.7.x 的平滑升级。
   - 重点：Spring Security DSL、Swagger 兼容、依赖收敛。
2. **Boot 3 + Java 17 路线准备（第二阶段）**
   - 重点：`javax -> jakarta` 迁移、Springfox 迁移到 springdoc、基础设施镜像与部署链路升级。
3. **依赖治理常态化**
   - 月度 dependency-check 报告、CVE 修复节奏、SBOM（CycloneDX）输出。

---

## 5. 是否建议继续升级到 Boot 2.7 / Boot 3 + Java 17

- **建议继续升级，但分阶段进行：**
  1) 先完成 Boot 2.7（中低风险，收益立竿见影）；
  2) 再做 Boot 3 + Java 17（中高风险，需要专项窗口）。

理由：当前仓库已具备可维护基础，但仍有配置治理与依赖一致性改进空间，分阶段可显著降低升级风险。

---

## 6. 审计结论

- 当前仓库已达到“**可稳定维护**”状态，可继续迭代。
- 最值得优先做的 3 个动作：
  1. 生产敏感配置全面环境变量化；
  2. Security 白名单按环境收敛；
  3. CI 增加 dependency-review + 静态质量检查。
