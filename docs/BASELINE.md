# 升级前基线（RuoYi-Vue 3.8.6）

> 本文件基于当前仓库静态配置整理，用于记录升级前的构建/启动/依赖/环境基线。

## 版本与运行环境

- RuoYi 版本：`3.8.6`（根 `pom.xml` & `application.yml`）。
- Spring Boot：`2.5.15`（根 `pom.xml` 依赖管理）。
- JDK：`1.8`（根 `pom.xml` 的 `java.version`）。
- Maven：未在仓库中固定版本，建议使用 3.6+。
- 前端：仓库未包含 `ruoyi-ui` 或其它前端工程（仅后端模块）。

## 模块与启动类

- 后端模块：`ruoyi-admin / ruoyi-framework / ruoyi-system / ruoyi-common / ruoyi-quartz / ruoyi-generator`。
- 启动类：`com.ruoyi.RuoYiApplication`（`ruoyi-admin` 模块）。

## 构建与启动命令（基线）

> 以下命令基于仓库默认结构整理。

- 编译打包：
  ```bash
  mvn clean package
  ```
- 启动（开发环境 profile）：
  ```bash
  java -jar ruoyi-admin/target/ruoyi-admin.jar --spring.profiles.active=dev
  ```

## 关键配置与 Profiles

- 默认 profile：`dev`（`ruoyi-admin/src/main/resources/application.yml`）。
- 核心配置文件：
  - `ruoyi-admin/src/main/resources/application.yml`（通用配置）。
  - `ruoyi-admin/src/main/resources/application-dev.yml`（开发环境）。
  - `ruoyi-admin/src/main/resources/application-prod.yml`（生产环境）。

## 服务端口

- 默认端口：`8080`（`application.yml`）。
- 开发环境端口：`9050`（`application-dev.yml`）。

## 数据库与初始化

- 数据源：MySQL + Druid（`application-prod.yml`）。
- 开发环境支持 H2 内存库（`application-dev.yml`，使用 `schema.sql` + `data.sql` 初始化）。
- JDBC Driver：`com.mysql.cj.jdbc.Driver`。
- 数据库初始化脚本：
  - `sql/ry_20230706.sql`（业务/基础数据）。
  - `sql/quartz.sql`（定时任务表）。

## Redis

- 默认地址：`127.0.0.1:6379`（`application.yml`/`application-dev.yml`）。
- 数据库索引：`0`。
- token 过期时间（分钟）：
  - `application.yml`：`30`。
  - `application-dev.yml`：`360`。

## 关键依赖/配置项（基线）

- MyBatis 配置：`mybatis.mapperLocations`、`mybatis.configLocation`。
- PageHelper：`pagehelper` 配置块。
- Swagger：`swagger.enabled`、`swagger.pathMapping`。
- JWT：`token.header` / `token.secret` / `token.expireTime`。
- MyBatis-Plus：`application-*.yml` 中存在 `mybatis-plus` 配置块；`ruoyi-common` 引入 `mybatis-plus-boot-starter`。
