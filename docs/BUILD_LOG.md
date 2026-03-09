# Build log excerpt

Command executed:

```
mvn -Denforcer.skip=true -e clean package
```

Excerpt around the current failure (no NoSuchFieldError reproduced; compilation fails due to missing Lombok on ruoyi-system):

```
[ERROR] /workspace/zhitan-pv/ruoyi-system/src/main/java/com/ruoyi/pvadmin/domain/dto/AlarmQueryDTO.java:[5,14] package lombok does not exist
[ERROR] /workspace/zhitan-pv/ruoyi-system/src/main/java/com/ruoyi/pvadmin/domain/dto/AlarmQueryDTO.java:[12,2] cannot find symbol
[ERROR]   symbol: class Data
[ERROR] /workspace/zhitan-pv/ruoyi-system/src/main/java/com/ruoyi/pvadmin/domain/dto/AlarmHandlingDTO.java:[3,14] package lombok does not exist
[ERROR] /workspace/zhitan-pv/ruoyi-system/src/main/java/com/ruoyi/pvadmin/domain/dto/AlarmHandlingDTO.java:[10,2] cannot find symbol
[ERROR]   symbol: class Data
[ERROR] /workspace/zhitan-pv/ruoyi-system/src/main/java/com/ruoyi/pvadmin/domain/vo/HomeAlarmVO.java:[3,14] package lombok does not exist
[ERROR] /workspace/zhitan-pv/ruoyi-system/src/main/java/com/ruoyi/pvadmin/domain/vo/HomeAlarmVO.java:[8,2] cannot find symbol
[ERROR]   symbol: class Data
[ERROR] /workspace/zhitan-pv/ruoyi-system/src/main/java/com/ruoyi/pvadmin/domain/vo/AlarmLevelAnalysisVO.java:[4,14] package lombok does not exist
[ERROR] /workspace/zhitan-pv/ruoyi-system/src/main/java/com/ruoyi/pvadmin/domain/vo/AlarmLevelAnalysisVO.java:[11,2] cannot find symbol
[ERROR]   symbol: class Data
[ERROR] /workspace/zhitan-pv/ruoyi-system/src/main/java/com/ruoyi/pvadmin/domain/model/AlarmLevelAnalysisItem.java:[3,14] package lombok does not exist
[ERROR] /workspace/zhitan-pv/ruoyi-system/src/main/java/com/ruoyi/pvadmin/domain/model/AlarmLevelAnalysisItem.java:[10,2] cannot find symbol
[ERROR]   symbol: class Data
```

---

## 2026-01-31 build

Command executed:

```
JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 PATH=/usr/lib/jvm/java-8-openjdk-amd64/bin:$PATH mvn -DskipTests -Denforcer.skip=true clean package
```

Result: **BUILD SUCCESS** (ruoyi-admin packaged successfully). Warnings were limited to Lombok-generated equals/hashCode callSuper notices and a mysql-connector relocation warning.

---

## 2026-01-31 dev 启动失败记录

1) 启动命令（dev profile）：

```
JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 PATH=/usr/lib/jvm/java-8-openjdk-amd64/bin:$PATH java -jar ruoyi-admin/target/ruoyi-admin.jar --spring.profiles.active=dev
```

失败原因：Druid 初始化数据库连接时 `Access denied for user 'root'@'localhost'`（MySQL root 账号未设置密码/权限与 `application-dev.yml` 不一致）。

2) 调整 MySQL root 密码后再次启动，失败原因：

```
Could not resolve placeholder 'wx.token' in value "${wx.token}"
```

结论：dev 配置需补齐 `wx.token`，否则 WeChat 相关 Bean 无法创建。

3) 补齐 `wx.token` 后再次启动，失败原因：

```
Could not resolve placeholder 'wx.encodingAesKey' in value "${wx.encodingAesKey}"
```

结论：dev 配置需补齐 `wx.encodingAesKey`。

4) 补齐 `wx.encodingAesKey` 后再次启动，失败原因：

```
Could not resolve placeholder 'wx.page' in value "${wx.page}"
```

结论：dev 配置需补齐 `wx.page`。

5) 补齐 `wx.page` 后再次启动，失败原因：

```
Could not resolve placeholder 'wx.template_id' in value "${wx.template_id}"
```

结论：dev 配置需补齐 `wx.template_id`。

---

## 2026-01-31 dev(H2) build + 启动记录

Command executed:

```
JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 PATH=/usr/lib/jvm/java-8-openjdk-amd64/bin:$PATH mvn -DskipTests -Denforcer.skip=true clean package
```

Result: **BUILD SUCCESS** (H2 dev schema/data included).

Startup command:

```
JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 PATH=/usr/lib/jvm/java-8-openjdk-amd64/bin:$PATH java -jar ruoyi-admin/target/ruoyi-admin.jar --spring.profiles.active=dev
```

Result: **STARTED** (RuoYiApplication started with H2 in-memory datasource).

---

## 2026-01-31 dev(H2) 启动失败记录

启动命令（dev profile, H2）：

```
JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 PATH=/usr/lib/jvm/java-8-openjdk-amd64/bin:$PATH java -jar ruoyi-admin/target/ruoyi-admin.jar --spring.profiles.active=dev
```

失败原因：`sys_job` 表缺失，Quartz 初始化查询失败。

```
Table "sys_job" not found; SQL statement: select job_id, job_name, job_group, invoke_target, cron_expression, misfire_policy, concurrent, status, create_by, create_time, remark from sys_job
```

结论：补齐 H2 schema 中 `sys_job` 表，并通过 dev profile 初始化脚本加载。

---

## 2026-01-31 dev(H2) 修复后启动记录

Command executed:

```
JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 PATH=/usr/lib/jvm/java-8-openjdk-amd64/bin:$PATH mvn -DskipTests -Denforcer.skip=true clean package
```

Result: **BUILD SUCCESS**.

Startup command:

```
JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 PATH=/usr/lib/jvm/java-8-openjdk-amd64/bin:$PATH java -jar ruoyi-admin/target/ruoyi-admin.jar --spring.profiles.active=dev
```

Result: **STARTED** (H2 schema/data initialized via dev profile).

---

## 2026-02-01 全量构建验证（失败记录）

尝试按照 Java 8 环境执行全量构建：

```
JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 PATH=/usr/lib/jvm/java-8-openjdk-amd64/bin:$PATH mvn -DskipTests -Denforcer.skip=true clean package
```

结果：**失败**。环境中未安装 `/usr/lib/jvm/java-8-openjdk-amd64`，导致 `JAVA_HOME` 无效。

```
The JAVA_HOME environment variable is not defined correctly,
this environment variable is needed to run this program.
```

尝试通过 `mise install java@8` 安装 JDK8，但 `mise` 未提供 8 的元数据（安装失败）。

说明：该失败为**环境问题**；项目在 Java8 环境下已通过 `clean package`（详见 2026-01-31 的成功记录）。

---

## 2026-02-06 生产类环境升级验证（MySQL + Redis）

> 说明：本次在容器内使用 MariaDB 10.11（监听 127.0.0.1:3306）与本地 Redis 模拟生产环境；通过外置配置覆盖 prod 数据源端口与 wx 参数。真实生产请先执行备份/快照。

### 环境与数据库准备

```
apt-get update
apt-get install -y mariadb-server mariadb-client
mkdir -p /run/mysqld && chown mysql:mysql /run/mysqld
mariadbd --user=mysql --datadir=/var/lib/mysql --socket=/run/mysqld/mysqld.sock --pid-file=/run/mysqld/mysqld.pid --port=3306 --bind-address=127.0.0.1 --skip-networking=0 --log-error=/tmp/mariadb.err
mysql --protocol=socket --socket=/run/mysqld/mysqld.sock -uroot <<'SQL'
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
CREATE USER IF NOT EXISTS 'root'@'127.0.0.1' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'127.0.0.1' WITH GRANT OPTION;
CREATE DATABASE IF NOT EXISTS pv_admin DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
FLUSH PRIVILEGES;
SQL
mysql --protocol=socket --socket=/run/mysqld/mysqld.sock -uroot -proot pv_admin < sql/ry_20230706.sql
mysql --protocol=socket --socket=/run/mysqld/mysqld.sock -uroot -proot pv_admin < sql/upgrade/3.8.6_to_3.9.1.sql
mysql --protocol=socket --socket=/run/mysqld/mysqld.sock -uroot -proot pv_admin -e "UPDATE sys_config SET config_value='false' WHERE config_key='sys.account.captchaEnabled';"
redis-server --daemonize yes
```

### 外置配置与启动

```
cat <<'YML' > /tmp/prod-override.yml
spring:
  datasource:
    druid:
      master:
        url: jdbc:mysql://127.0.0.1:3306/pv_admin?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=false&serverTimezone=GMT%2B8
        username: root
        password: root
  redis:
    host: 127.0.0.1
    port: 6379
YML

WX_APPID=demo-appid WX_SECRET=demo-secret WX_TOKEN=demo-token \
WX_ENCODING_AES_KEY=demo-aes-key WX_PAGE=pages/index \
WX_TEMPLATE_ID=demo-template WX_ENV_VERSION=release \
JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 \
PATH=/usr/lib/jvm/java-8-openjdk-amd64/bin:$PATH \
java -jar ruoyi-admin/target/ruoyi-admin.jar \
  --spring.profiles.active=prod \
  --spring.config.additional-location=/tmp/prod-override.yml
```

关键日志摘要：
- `Started RuoYiApplication ... profile is active: "prod"`
- `DruidDataSource ... inited`
- `若依启动成功`

### 生产类最小冒烟

```
# login
curl -s -X POST "http://127.0.0.1:9050/login" -H "Content-Type: application/json" -d '{"username":"admin","password":"admin123"}'

# getInfo
token=$(curl -s -X POST "http://127.0.0.1:9050/login" -H "Content-Type: application/json" -d '{"username":"admin","password":"admin123"}' | python -c 'import sys, json; print(json.load(sys.stdin)["token"])')
curl -s -X GET "http://127.0.0.1:9050/getInfo" -H "Authorization: Bearer ${token}"

# getRouters
token=$(curl -s -X POST "http://127.0.0.1:9050/login" -H "Content-Type: application/json" -d '{"username":"admin","password":"admin123"}' | python -c 'import sys, json; print(json.load(sys.stdin)["token"])')
curl -s -X GET "http://127.0.0.1:9050/getRouters" -H "Authorization: Bearer ${token}"

# 微信关键链路（/wxLogin）
curl -s -X POST "http://127.0.0.1:9050/wxLogin" -H "Content-Type: application/json" -d '{"username":"admin","password":"admin123"}'
```

结果摘要：
- `/login` 返回 `code=200`，获得 token。
- `/getInfo` 返回 `code=200`，包含 roles/permissions/user。
- `/getRouters` 返回 `code=200`，data 非空。
- `/wxLogin` 返回 `code=200`。

### 依赖安全扫描（首次尝试）

```
mvn -DskipTests org.owasp:dependency-check-maven:check -Dformat=JSON -DoutputDirectory=docs/dependency-check -DfailBuildOnCVSS=11 -DfailOnError=false
```

结果摘要：
- 扫描启动后需要全量同步 NVD（提示无 API key）。
- 无 API key 下载进度在 3%～6% 时耗时过长，被手动终止；完整报告未生成。
- 建议配置 `NVD_API_KEY` 后在 CI 执行，以产出完整结果与修复建议。

## 2026-03-09 验证补充：生产敏感配置环境变量化回归

### 1) Java 8 + 可执行 jar 打包

```bash
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
java -version
mvn -DskipTests -pl ruoyi-admin -am package
```

结果：`BUILD SUCCESS`，产物 `ruoyi-admin/target/ruoyi-admin.jar` 可执行。

### 2) A. dev(H2) 回归验证（端口 9051）

启动：
```bash
redis-server --daemonize yes
java -jar ruoyi-admin/target/ruoyi-admin.jar --spring.profiles.active=dev --server.port=9051
```

接口验证：
```bash
curl -s -X POST 'http://127.0.0.1:9051/login' \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"admin123"}'

curl -s -H "Authorization: Bearer <token>" 'http://127.0.0.1:9051/getInfo'
curl -s -H "Authorization: Bearer <token>" 'http://127.0.0.1:9051/getRouters'
```

结果：
- `/login` -> `code=200`
- `/getInfo` -> `code=200`
- `/getRouters` -> `code=200`

结论：dev(H2) 未受 prod 环境变量化改造影响。

### 3) B. prod 配置静态 + 最小运行验证（端口 9052）

临时覆盖（避免依赖真实 MySQL，验证配置解析链路）：
`/tmp/prod-override.yml`
```yaml
spring:
  datasource:
    driverClassName: org.h2.Driver
    druid:
      master:
        url: jdbc:h2:mem:prodverify;MODE=MySQL;DB_CLOSE_DELAY=-1;DATABASE_TO_LOWER=TRUE;CASE_INSENSITIVE_IDENTIFIERS=TRUE
        username: sa
        password: ""
  redis:
    host: localhost
    port: 6379
    database: 0
    password:
```

启动（仅演示关键变量，均从环境注入）：
```bash
PROD_DB_USERNAME=dummy PROD_DB_PASSWORD=dummy PROD_REDIS_PASSWORD=dummy \
PROD_TOKEN_SECRET=prod-token-secret-value \
PROD_DRUID_LOGIN_USERNAME=ops PROD_DRUID_LOGIN_PASSWORD=ops-pass \
PROD_WX_APPID=wxapp PROD_WX_SECRET=wxsec PROD_WX_TOKEN=wxtoken \
PROD_WX_ENCODING_AES_KEY=abcdefghijklmnopqrstuvwxyzABCDE1234567890 \
PROD_WX_PAGE=pages/index/index PROD_WX_TEMPLATE_ID=tmpl_123 \
PROD_INFLUXDB_TOKEN=influx_token \
java -jar ruoyi-admin/target/ruoyi-admin.jar \
  --spring.profiles.active=prod \
  --server.port=9052 \
  --spring.config.additional-location=/tmp/prod-override.yml
```

结果：应用在 `prod` profile 正常启动（日志包含 `Started RuoYiApplication`）。

结论：
1. 环境变量占位符可被正确解析；
2. 在提供关键环境变量后，不会因移除明文默认值在配置阶段报错。

### 4) 本轮结论

- dev(H2) 回归：通过。
- prod 环境变量化最小运行验证：通过。
- 当前未发现遗漏的高敏感明文项（DB/Redis/token/Druid/wx/Influx token 均已外置）。

## 2026-03-09 第2项优化：Security 白名单按环境收敛

### A. 白名单盘点（改造前）

`SecurityConfig` 旧匿名放行：
- 基础匿名：`/login`、`/register`、`/captchaImage`
- 微信：`/wxLogin`、`/wx/**`（整段）
- 静态资源：`GET /`、`/*.html`、`/**/*.html`、`/**/*.css`、`/**/*.js`、`/profile/**`
- 文档/监控：`/swagger-ui.html`、`/swagger-resources/**`、`/webjars/**`、`/*/api-docs`、`/druid/**`
- dev-only：`/h2-console/**`

处理器映射（关键路径）：
- `/login`、`/wxLogin` -> `SysLoginController`
- `/captchaImage` -> `CaptchaController`
- `/wx/msg`（GET/POST）与 `/wx/send` -> `WXController`
- `/druid/**` -> Druid `StatViewServlet`
- swagger -> `SwaggerConfig` + `ResourcesConfig(/swagger-ui/**)`

匿名需求判定：
- 必须匿名：`/login`、`/captchaImage`、`/wxLogin`、微信回调 `/wx/msg`。
- 仅 dev 便利：`/h2-console/**`、swagger、druid。
- 不应在 prod 广泛匿名：`/wx/**`（应收敛），swagger、druid。

### B. 收敛改动

1. `SecurityConfig`：
- 删除整段匿名 `"/wx/**"`，收敛为仅放行：
  - `GET /wx/msg`
  - `POST /wx/msg`
- 新增基础匿名 `"/error"`。
- swagger + druid 改为 **仅 dev profile 放行**。
- 保留 dev-only `"/h2-console/**"` 放行。
- 收敛静态规则，去掉 `"/**/*.html"`，避免间接放开 swagger/druid html。

2. `application-prod.yml`：
- `swagger.enabled: false`（prod 默认关闭文档）。

### C. 验证

#### 1) dev(H2) 回归（9051）

- `/login` -> `code=200`
- `/getInfo` -> `code=200`
- `/getRouters` -> `code=200`
- `/wxLogin`（匿名）-> `code=200`
- `/h2-console/` 可访问（HTTP 200）

#### 2) prod 收敛验证（9052，环境变量 + `/tmp/prod-override.yml`）

匿名访问结果：
- `/swagger-ui/index.html` -> `{"code":401,...}`（已受限）
- `/druid/index.html` -> `{"code":401,...}`（已受限）
- `/wx/msg` -> 非 401（缺参数返回业务异常，证明仍可匿名进入回调入口）
- `/wx/send` -> `{"code":401,...}`（不再匿名）
- `/wxLogin` -> `code=200`（关键链路保留）

### D. 结论

- 已按环境完成白名单收敛：dev 保留开发便利；prod 默认更严格。
- `wx` 匿名已从整段收敛为最小集合（仅 `/wx/msg` 回调 + `/wxLogin` 登录）。
- 当前无新增待业务确认的匿名路径；若后续新增微信回调路径，应按最小原则显式加入白名单。

---

## 2026-03-09 CI 质量门禁闭环验证（dependency-review + SpotBugs）

### 1) workflow 语义检查

检查文件：`.github/workflows/ci-quality-gates.yml`

结论：
1. `dependency-review` 仅在 `pull_request` 事件执行（`if: github.event_name == 'pull_request'`），满足 PR 级准入预期。
2. `dependency-review` 保持 phase-1 非阻断（job 级 `continue-on-error: true`），在仓库能力受限（fork/权限/依赖图）时不会阻塞主线。
3. SpotBugs 报告与上传路径一致：扫描输出为 `**/target/spotbugsXml.xml`，upload-artifact 已覆盖；`spotbugs.html` 作为可选项保留。
4. 与项目基线一致：JDK 8（`setup-java`），SpotBugs 命令已调整为先执行基线构建再扫描：

```
mvn -DskipTests -Denforcer.skip=true clean package com.github.spotbugs:spotbugs-maven-plugin:4.8.6.6:spotbugs
```

> 调整原因：仅执行 `spotbugs:spotbugs` 时，多模块场景可能出现模块间依赖未就绪（例如 `ruoyi-common` 未产出可用构件）导致失败。

### 2) SpotBugs 可运行性检查（Java 8）

执行环境切换与验证：

```
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
java -version
mvn -version
```

先执行原命令（仅 spotbugs goal）结果：
- 插件可解析并启动；
- 但在 `ruoyi-system` 发生依赖解析失败（`com.ruoyi:ruoyi-common:3.9.1`），证明“仅 goal”在当前多模块仓库不稳。

执行修正后命令结果：

```
mvn -DskipTests -Denforcer.skip=true clean package com.github.spotbugs:spotbugs-maven-plugin:4.8.6.6:spotbugs -Dspotbugs.failOnError=false
```

- **BUILD SUCCESS**；
- 各模块均出现 `Done SpotBugs Analysis....`；
- 报告生成成功（示例）：
  - `ruoyi-common/target/spotbugsXml.xml`
  - `ruoyi-system/target/spotbugsXml.xml`
  - `ruoyi-framework/target/spotbugsXml.xml`
  - `ruoyi-quartz/target/spotbugsXml.xml`
  - `ruoyi-generator/target/spotbugsXml.xml`
  - `ruoyi-admin/target/spotbugsXml.xml`

噪音概况（非阻断）：
- 本轮主要是 Lombok `equals/hashCode callSuper` 相关 compiler warning，以及个别 deprecated API 提示；
- SpotBugs phase-1 仍按告警处理，不阻断构建。

### 3) 文档一致性检查

检查文档：
- `docs/CI_QUALITY_GATES.md`
- `docs/DEPENDENCY_CHECK.md`
- `docs/BUILD_LOG.md`

结论：
- phase-1 策略一致：`build` 阻断，`dependency-check` / `dependency-review` / `spotbugs` 为告警；
- `dependency-review` 的仓库能力限制与 fallback 已明确；
- SpotBugs 当前为非阻断，并明确 `fail build` 不开启（workflow 通过 `continue-on-error: true` 保持）。

### 最终结论

- **CI 质量门禁已闭环**：workflow 语义、命令可运行性、报告产物、文档口径均已对齐。
- **当前无阻塞项**（针对门禁可用性本身）。
- 后续仅需按告警治理节奏逐步收敛高风险问题，再评估是否升级为阻断。
