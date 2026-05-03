# 数据库升级脚本执行说明

## 执行顺序
1. 业务库备份/快照（生产必做）。
2. 执行增量脚本：
   ```sql
   sql/upgrade/3.8.6_to_3.9.1.sql
   ```
3. 若历史未初始化 Quartz 表，再执行：
   ```sql
   sql/quartz.sql
   ```

## 注意事项
- `3.8.6_to_3.9.1.sql` 为 **非幂等**（`ALTER TABLE ... ADD COLUMN`），重复执行会报“列已存在”。
- 建议在低峰期执行，执行前做好备份并核对当前库版本。

## 预检查清单（发现非幂等冲突风险）

```sql
-- 检查是否已存在新增字段
SELECT COLUMN_NAME
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'sys_user'
  AND COLUMN_NAME = 'pwd_update_date';

SELECT COLUMN_NAME
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'sys_menu'
  AND COLUMN_NAME = 'route_name';

SELECT COLUMN_NAME
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'gen_table'
  AND COLUMN_NAME = 'tpl_web_type';

-- 如返回结果非空，说明已执行过对应变更，不应重复执行。
```

## 回滚策略
- **推荐**：执行前创建数据库快照或使用 `mysqldump` 备份。
- 如需回滚，使用备份恢复或手动删除新增字段：
  ```sql
  ALTER TABLE sys_user DROP COLUMN pwd_update_date;
  ALTER TABLE sys_menu DROP COLUMN route_name;
  ALTER TABLE gen_table DROP COLUMN tpl_web_type;
  ```
