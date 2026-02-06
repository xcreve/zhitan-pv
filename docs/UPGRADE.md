# RuoYi-Vue 3.8.6 -> 3.9.1 升级说明

## 目标版本
- 目标：RuoYi-Vue `v3.9.1`（保持 Spring Boot 2.5.15 / JDK8）。

## 关键变更点（本仓库）
1. **依赖与基础版本对齐**
   - 根 `pom.xml` 将 `ruoyi.version` 升级为 `3.9.1`，并对齐 v3.9.1 的依赖版本（Druid、Fastjson2、PageHelper、OSHI、Tomcat、Spring Security、Spring Framework 等）。
   - 增加 Lombok 版本与编译工具链配置，并通过 Enforcer 固定 JDK8 构建环境，避免 javac NoSuchFieldError。

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

### 回滚建议
- 执行前请备份库；如需回滚，请使用备份恢复或回退新增字段。



> 实际冒烟验证步骤见 `docs/SMOKE_TEST.md`。
