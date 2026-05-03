-- --------------------------------------------------------
-- RuoYi-Vue 3.8.6 -> 3.9.1 增量升级脚本（框架表）
-- 说明：仅包含框架表结构增量，不涉及业务表。
-- --------------------------------------------------------

-- 1) 用户表新增密码更新时间字段
ALTER TABLE sys_user
    ADD COLUMN pwd_update_date datetime NULL COMMENT '密码最后更新时间' AFTER login_date;

-- 2) 菜单表新增路由名称字段
ALTER TABLE sys_menu
    ADD COLUMN route_name varchar(50) DEFAULT '' COMMENT '路由名称' AFTER `query`;

-- 3) 代码生成表新增前端模板类型字段
ALTER TABLE gen_table
    ADD COLUMN tpl_web_type varchar(30) DEFAULT '' COMMENT '前端模板类型（element-ui模版 element-plus模版）' AFTER tpl_category;
