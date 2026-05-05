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

-- 模块 6：备品备件
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2016, '备品备件', 2010, 6, 'spareParts', 'pvadmin/operation/spareParts/index', NULL, '1', '0', 'C', '0', '0', 'pvadmin:spareParts:list', 'shopping', 'admin', NOW());

-- 二级目录：报警
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2060, '报警', 2000, 6, 'alarm', NULL, NULL, '1', '0', 'M', '0', '0', NULL, 'bug', 'admin', NOW());

-- 模块 7：智能报警
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2061, '智能报警', 2060, 1, 'index', 'pvadmin/alarm/index', NULL, '1', '0', 'C', '0', '0', 'pvadmin:alarm:list', 'bug', 'admin', NOW());

-- 二级目录：实时监测
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2020, '实时监测', 2000, 2, 'realtime', NULL, NULL, '1', '0', 'M', '0', '0', NULL, 'monitor', 'admin', NOW());

-- 模块 8：电站实时状态
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2021, '电站实时状态', 2020, 1, 'station', 'pvadmin/realtime/station/index', NULL, '1', '0', 'C', '0', '0', 'pvadmin:realtime:station', 'list', 'admin', NOW());

-- 模块 9：设备实时状态
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2022, '设备实时状态', 2020, 2, 'device', 'pvadmin/realtime/device/index', NULL, '1', '0', 'C', '0', '0', 'pvadmin:realtime:device', 'monitor', 'admin', NOW());

-- 模块 10：实时数据
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2023, '实时数据', 2020, 3, 'data', 'pvadmin/realtime/data/index', NULL, '1', '0', 'C', '0', '0', 'pvadmin:realtime:data', 'table', 'admin', NOW());

-- 二级目录：统计分析
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2030, '统计分析', 2000, 3, 'analysis', NULL, NULL, '1', '0', 'M', '0', '0', NULL, 'chart', 'admin', NOW());

-- 模块 11：电站发电统计
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2031, '电站发电统计', 2030, 1, 'powerStation', 'pvadmin/analysis/powerStation/index', NULL, '1', '0', 'C', '0', '0', 'pvadmin:analysis:powerStation', 'chart', 'admin', NOW());

-- 模块 12：设备发电统计
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2032, '设备发电统计', 2030, 2, 'device', 'pvadmin/analysis/device/index', NULL, '1', '0', 'C', '0', '0', 'pvadmin:analysis:device', 'chart', 'admin', NOW());

-- 模块 13：同比分析
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2033, '同比分析', 2030, 3, 'sameCompare', 'pvadmin/analysis/sameCompare/index', NULL, '1', '0', 'C', '0', '0', 'pvadmin:analysis:sameCompare', 'chart', 'admin', NOW());

-- 模块 14：环比分析
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2034, '环比分析', 2030, 4, 'loopCompare', 'pvadmin/analysis/loopCompare/index', NULL, '1', '0', 'C', '0', '0', 'pvadmin:analysis:loopCompare', 'chart', 'admin', NOW());

-- 二级目录：峰平谷
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2040, '峰平谷', 2000, 4, 'peakValley', NULL, NULL, '1', '0', 'M', '0', '0', NULL, 'time-range', 'admin', NOW());

-- 模块 15：图表统计
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2041, '图表统计', 2040, 1, 'chart', 'pvadmin/peakValley/chart/index', NULL, '1', '0', 'C', '0', '0', 'pvadmin:peakValley:chart', 'chart', 'admin', NOW());

-- 模块 16：报表统计
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2042, '报表统计', 2040, 2, 'report', 'pvadmin/peakValley/report/index', NULL, '1', '0', 'C', '0', '0', 'pvadmin:peakValley:report', 'form', 'admin', NOW());

-- 二级目录：电能质量
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2050, '电能质量', 2000, 5, 'powerQuality', NULL, NULL, '1', '0', 'M', '0', '0', NULL, 'skill', 'admin', NOW());

-- 模块 17：负荷分析
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2051, '负荷分析', 2050, 1, 'load', 'pvadmin/powerQuality/load/index', NULL, '1', '0', 'C', '0', '0', 'pvadmin:powerQuality:load', 'chart', 'admin', NOW());

-- 模块 18：三相不平衡分析
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2052, '三相不平衡分析', 2050, 2, 'threePhase', 'pvadmin/powerQuality/threePhase/index', NULL, '1', '0', 'C', '0', '0', 'pvadmin:powerQuality:threePhase', 'chart', 'admin', NOW());

-- 模块 19：功率因数分析
INSERT INTO sys_menu (menu_id, menu_name, parent_id, order_num, path, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time)
VALUES (2053, '功率因数分析', 2050, 3, 'powerFactor', 'pvadmin/powerQuality/powerFactor/index', NULL, '1', '0', 'C', '0', '0', 'pvadmin:powerQuality:powerFactor', 'chart', 'admin', NOW());
