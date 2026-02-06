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
