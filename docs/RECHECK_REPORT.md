# 升级后全量复查报告

> 目标：发现隐藏错误/遗漏，并完成修复与验证（不限于编译）。

## 已执行命令（原样）

### 静态检查
- `rg -n "eu\.bitwalker\.UserAgentUtils|UserAgentUtils" -S`
- `rg -n "systemPath" -S`
- `rg -n "jakarta\.|javax\." -S`
- `rg -n "artifactId>ruoyi</artifactId>" -n pom.xml ruoyi-*/pom.xml`
- `rg -n "<version>3\.9\.1</version>" -g "pom.xml"`
- `rg -n "jdbc:h2|spring\.h2\.console|spring\.sql\.init|h2-console" ruoyi-admin/src/main/resources/application*.yml`

### 构建与依赖
- `apt-get update`
- `apt-get install -y openjdk-8-jdk`
- `JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 PATH=/usr/lib/jvm/java-8-openjdk-amd64/bin:$PATH mvn -DskipTests clean package`
- `JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 PATH=/usr/lib/jvm/java-8-openjdk-amd64/bin:$PATH mvn -DskipTests dependency:tree > docs/DEPENDENCY_TREE.txt`

### 运行验证（dev/H2）
- `apt-get install -y redis-server`
- `redis-server --daemonize yes`
- `JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 PATH=/usr/lib/jvm/java-8-openjdk-amd64/bin:$PATH java -jar ruoyi-admin/target/ruoyi-admin.jar --spring.profiles.active=dev`
- `curl -s -X POST "http://127.0.0.1:9050/login" -H "Content-Type: application/json" -d '{"username":"admin","password":"admin123"}'`
- `curl -s -X GET "http://127.0.0.1:9050/getInfo" -H "Authorization: Bearer <token>"`
- `curl -s -X GET "http://127.0.0.1:9050/getRouters" -H "Authorization: Bearer <token>"`
- `curl -s -X POST "http://127.0.0.1:9050/wxLogin" -H "Content-Type: application/json" -d '{"username":"admin","password":"admin123"}'`

## 发现的问题列表

1) **H2 Console 在 dev 配置中开启，但未加入 Security 白名单**
   - 位置：`ruoyi-framework/src/main/java/com/ruoyi/framework/config/SecurityConfig.java`
   - 影响：`/h2-console/**` 在 dev 环境无法访问（被安全链拦截）。
   - 处理：添加 dev profile 条件白名单，仅在 dev 环境允许 `/h2-console/**`。

2) **dev 启动时 Redis 不可用导致启动失败（环境问题）**
   - 现象：`Unable to connect to 127.0.0.1:6379`。
   - 处理：安装并启动 `redis-server` 后，dev(H2) 启动与冒烟请求通过。
   - 备注：该问题属于环境依赖，非代码缺陷，但已在本次复查中补齐运行前置条件。

## 修复提交列表
- `7cc47a1` — fix(security): allow H2 console in dev only

## 最终验收
- **构建**：`mvn -DskipTests clean package`（Java 8 / Enforcer 开启）通过。
- **依赖树**：`docs/DEPENDENCY_TREE.txt` 已生成。
- **dev(H2) 启动**：启动成功（Redis 已就绪）。
- **冒烟**：`/login`、`/getInfo`、`/getRouters`、`/wxLogin` 返回 `code=200`。

## 额外静态收尾结论

### 1) prod 未被 dev(H2) 污染的证据
执行命令：
```
rg -n "jdbc:h2|spring\.h2\.console|spring\.sql\.init|h2-console" ruoyi-admin/src/main/resources/application*.yml
```
输出摘要（仅命中 dev 配置）：
```
ruoyi-admin/src/main/resources/application-dev.yml:58:        url: jdbc:h2:mem:ruoyi;MODE=MySQL;DB_CLOSE_DELAY=-1;DATABASE_TO_LOWER=TRUE;CASE_INSENSITIVE_IDENTIFIERS=TRUE
ruoyi-admin/src/main/resources/application-dev.yml:156:      path: /h2-console
```
结论：`application-prod.yml` 与 `application.yml` 未出现 H2/SQL init/H2 console 配置，prod 不会误执行 dev 初始化脚本。

### 2) /h2-console/** 放行的 dev-only gating 机制说明
- 位置：`ruoyi-framework/src/main/java/com/ruoyi/framework/config/SecurityConfig.java`
- 机制：通过 `Environment#getActiveProfiles()` 判断是否包含 `dev`，仅当 `isDevProfile()` 为 `true` 时将 `/h2-console/**` 加入匿名白名单；非 dev 环境不会放行。
