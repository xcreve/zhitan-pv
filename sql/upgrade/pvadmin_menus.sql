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

-- 模块 2：设备类型管理
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2012, '设备类型管理', 2010, 2, 'deviceType', 'pvadmin/operation/deviceType/index', NULL, '1', '0', 'C', '0', '0', 'pvadmin:deviceType:list', 'tree-table', 'admin', NOW());

-- 模块 3：设备管理
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2013, '设备管理', 2010, 3, 'device', 'pvadmin/operation/device/index', NULL, '1', '0', 'C', '0', '0', 'pvadmin:device:list', 'monitor', 'admin', NOW());

-- 模块 4：设备点检
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2014, '设备点检', 2010, 4, 'inspection', 'pvadmin/operation/inspection/index', NULL, '1', '0', 'C', '0', '0', 'pvadmin:inspection:list', 'edit', 'admin', NOW());

-- 模块 5：峰平谷配置
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2015, '峰平谷配置', 2010, 5, 'electricityTypeSetting', 'pvadmin/operation/electricityTypeSetting/index', NULL, '1', '0', 'C', '0', '0', 'pvadmin:electricityTypeSetting:list', 'time-range', 'admin', NOW());
