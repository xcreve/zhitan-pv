-- ZhiTan-PV pvadmin 业务菜单注入（适配 RuoYi 3.9.2 sys_menu 动态菜单）
SET FOREIGN_KEY_CHECKS = 0;
START TRANSACTION;

-- 删除已有 pvadmin 菜单（幂等，便于重跑）
DELETE FROM sys_role_menu WHERE menu_id BETWEEN 2000 AND 2999;
DELETE FROM sys_menu       WHERE menu_id BETWEEN 2000 AND 2999;

-- 顶级目录
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2000, '光伏管理', 0, 5, 'pvadmin', NULL, NULL, '1', '0', 'M', '0', '0', NULL, 'monitor', 'admin', NOW());

-- 二级目录：运维管理
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2010, '运维管理', 2000, 1, 'operation', NULL, NULL, '1', '0', 'M', '0', '0', NULL, 'tool', 'admin', NOW());

-- 模块 1：电站管理
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2011, '电站管理', 2010, 1, 'powerStation', 'pvadmin/operation/powerStation/index', NULL, '1', '0', 'C', '0', '0', 'pvadmin:powerStation:list', 'list', 'admin', NOW());
