insert into sys_dept
values (100, 0, '0', '若依科技', 0, '若依', '15888888888', 'ry@qq.com', '0', '0', 'admin', CURRENT_TIMESTAMP, '', null);
insert into sys_dept
values (101, 100, '0,100', '深圳总公司', 1, '若依', '15888888888', 'ry@qq.com', '0', '0', 'admin', CURRENT_TIMESTAMP, '', null);
insert into sys_dept
values (103, 101, '0,100,101', '研发部门', 1, '若依', '15888888888', 'ry@qq.com', '0', '0', 'admin', CURRENT_TIMESTAMP, '', null);

insert into sys_user
values (1, 103, 'admin', '若依', '00', 'ry@163.com', '15888888888', '1', '',
        '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', '0', '0', '127.0.0.1',
        CURRENT_TIMESTAMP, null, 'admin', CURRENT_TIMESTAMP, '', null, '管理员');

insert into sys_post
values (1, 'ceo', '董事长', 1, '0', 'admin', CURRENT_TIMESTAMP, '', null, '');

insert into sys_user_post values (1, 1);

insert into sys_role
values (1, '超级管理员', 'admin', 1, '1', 1, 1, '0', '0', 'admin', CURRENT_TIMESTAMP, '', null, '超级管理员');

insert into sys_user_role values (1, 1);

insert into sys_menu
values (1, '系统管理', 0, 1, 'system', 'Layout', '', '', 1, 0, 'M', '0', '0', '', 'system', 'admin', CURRENT_TIMESTAMP,
        '', null, '系统管理目录');
insert into sys_menu
values (100, '用户管理', 1, 1, 'user', 'system/user/index', '', '', 1, 0, 'C', '0', '0', 'system:user:list', 'user', 'admin',
        CURRENT_TIMESTAMP, '', null, '用户管理菜单');

insert into sys_role_menu values (1, 1);
insert into sys_role_menu values (1, 100);

insert into sys_dict_type
values (1, '用户性别', 'sys_user_sex', '0', 'admin', CURRENT_TIMESTAMP, '', null, '用户性别列表');

insert into sys_dict_data
values (1, 1, '男', '0', 'sys_user_sex', '', '', 'Y', '0', 'admin', CURRENT_TIMESTAMP, '', null, '性别男');
insert into sys_dict_data
values (2, 2, '女', '1', 'sys_user_sex', '', '', 'N', '0', 'admin', CURRENT_TIMESTAMP, '', null, '性别女');
insert into sys_dict_data
values (3, 3, '未知', '2', 'sys_user_sex', '', '', 'N', '0', 'admin', CURRENT_TIMESTAMP, '', null, '性别未知');

insert into sys_config
values (1, '账号自助-验证码开关', 'sys.account.captchaEnabled', 'false', 'Y', 'admin', CURRENT_TIMESTAMP, '', null,
        '是否开启验证码功能（true开启，false关闭）');
insert into sys_config
values (2, '用户管理-账号初始密码', 'sys.user.initPassword', '123456', 'Y', 'admin', CURRENT_TIMESTAMP, '', null, '初始化密码');
insert into sys_config
values (3, '光伏-碳排放折算系数', 'sys.factor.carbonEmission', '0.785', 'Y', 'admin', CURRENT_TIMESTAMP, '', null,
        '每千瓦时发电量折算二氧化碳减排千克数');

insert into power_station
    (id, parent_id, code, name, subsidized_prices, installed_capacity, grid_voltage, lon, lat, owning_user_id, user_id, dept_id,
     remark, create_by, create_time)
values
    ('PS001', null, 'PS001', '深圳示范光伏电站', 0.42, 3.25, 10.00, 114.057868, 22.543099, '1', 1, 103,
     'H2 dev 演示电站', 'admin', CURRENT_TIMESTAMP);

insert into device_type
    (id, name, description, remark, create_by, create_time)
values
    ('DT_INV', '组串式逆变器', '光伏发电逆变设备', 'H2 dev 演示设备类型', 'admin', CURRENT_TIMESTAMP),
    ('DT_METER', '并网电表', '电站并网计量设备', 'H2 dev 演示设备类型', 'admin', CURRENT_TIMESTAMP);

insert into device_type_index_template
    (id, device_type_id, device_type_name, name, code, index_type, unit, tag_key, create_by, create_time)
values
    ('TPL_INV_IE', 'DT_INV', '组串式逆变器', '实时功率', 'IE', 'COLLECT', 'kW', 'power', 'admin', CURRENT_TIMESTAMP),
    ('TPL_INV_CGL', 'DT_INV', '组串式逆变器', '累计发电量', 'CGL', 'COLLECT', 'kWh', 'generation', 'admin', CURRENT_TIMESTAMP),
    ('TPL_METER_ACC', 'DT_METER', '并网电表', '累计电量', 'ACC', 'COLLECT', 'kWh', 'acc', 'admin', CURRENT_TIMESTAMP);

insert into device
    (id, power_station_id, code, name, device_type_id, capacity, factory, rated_ac_power, grid_type, module_peak_power,
     ammeter, user_id, dept_id, remark, create_by, create_time)
values
    ('DEV_INV_01', 'PS001', 'INV001', '1# 逆变器', 'DT_INV', 1.60, 'Demo Solar', 60.00, 'AC380V', 550.00,
     0, 1, 103, 'H2 dev 演示逆变器', 'admin', CURRENT_TIMESTAMP),
    ('DEV_METER_01', 'PS001', 'MTR001', '并网总表', 'DT_METER', 3.25, 'Demo Meter', 0.00, 'AC380V', 0.00,
     1, 1, 103, 'H2 dev 演示电表', 'admin', CURRENT_TIMESTAMP);

insert into device_index
    (id, index_id, device_id, index_code, index_type, unit, tag_key, factor, create_by, create_time)
values
    ('DI_INV_IE', 'TPL_INV_IE', 'DEV_INV_01', 'INV001_IE', 'COLLECT', 'kW', 'power', 1, 'admin', CURRENT_TIMESTAMP),
    ('DI_INV_CGL', 'TPL_INV_CGL', 'DEV_INV_01', 'INV001_CGL', 'COLLECT', 'kWh', 'generation', 1, 'admin', CURRENT_TIMESTAMP),
    ('DI_METER_ACC', 'TPL_METER_ACC', 'DEV_METER_01', 'MTR001_ACC', 'COLLECT', 'kWh', 'acc', 1, 'admin', CURRENT_TIMESTAMP);

insert into data_item
    (device_id, time_code, time_type, data_time, begin_time, end_time, value, create_by, create_time)
values
    ('DEV_INV_01', 'CURRENT_HOUR', 'HOUR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 128.50, 'admin', CURRENT_TIMESTAMP),
    ('DEV_INV_01', 'CURRENT_DAY', 'DAY', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 864.20, 'admin', CURRENT_TIMESTAMP),
    ('DEV_INV_01', 'CURRENT_MONTH', 'MONTH', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 28640.80, 'admin', CURRENT_TIMESTAMP);

insert into electricity_data_item
    (device_id, data_time, type, begin_time, end_time, value, cost, price, create_by, create_time)
values
    ('DEV_METER_01', CURRENT_TIMESTAMP, 'peak', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 420.50, 176.61, 0.42, 'admin', CURRENT_TIMESTAMP),
    ('DEV_METER_01', CURRENT_TIMESTAMP, 'flat', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 260.30, 91.11, 0.35, 'admin', CURRENT_TIMESTAMP),
    ('DEV_METER_01', CURRENT_TIMESTAMP, 'trough', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 183.40, 45.85, 0.25, 'admin', CURRENT_TIMESTAMP);

insert into alarm
    (id, data_time, err_code, device_code, error_description, solution, level, status, remark, create_by, create_time)
values
    ('ALM001', CURRENT_TIMESTAMP, 'PV-DC-LOW', 'INV001', '逆变器直流侧电压偏低', '检查组件串接线与汇流箱状态', 2, '1',
     'H2 dev 演示告警', 'admin', CURRENT_TIMESTAMP);

insert into electricity_type_setting
    (id, begin_time, end_time, remark, create_by, create_time)
values
    ('ETS2026', TIMESTAMP '2026-01-02 00:00:00', TIMESTAMP '2026-12-31 23:59:59', 'H2 dev 峰平谷配置', 'admin', CURRENT_TIMESTAMP);

insert into electricity_type_setting_item
    (id, parent_id, type, begin_time, end_time, electricity_price, remark, create_by, create_time)
values
    ('ETSI_PEAK', 'ETS2026', 'peak', TIMESTAMP '2026-01-01 08:00:00', TIMESTAMP '2026-01-01 18:00:00', 0.42, '峰段', 'admin', CURRENT_TIMESTAMP),
    ('ETSI_FLAT', 'ETS2026', 'flat', TIMESTAMP '2026-01-01 18:00:00', TIMESTAMP '2026-01-01 22:00:00', 0.35, '平段', 'admin', CURRENT_TIMESTAMP),
    ('ETSI_TROUGH', 'ETS2026', 'trough', TIMESTAMP '2026-01-01 22:00:00', TIMESTAMP '2026-01-02 08:00:00', 0.25, '谷段', 'admin', CURRENT_TIMESTAMP);

insert into inventory_location
    (id, location, remark)
values
    (1, '深圳示范站仓库', 'H2 dev 演示库存地点');

insert into spare_parts
    (id, code, name, specs, power_station_id, amount, location, location_id, remark, create_by, create_time)
values
    ('SP001', 'SP-FUSE-20A', '直流熔断器', '20A / 1000VDC', 'PS001', 12, '深圳示范站仓库', 1, 'H2 dev 演示备件', 'admin', CURRENT_TIMESTAMP);

insert into spare_parts_record
    (id, code, name, specs, power_station_id, amount, status, location, location_id, movement_date, remark, create_by, create_time)
values
    ('SPR001', 'SP-FUSE-20A', '直流熔断器', '20A / 1000VDC', 'PS001', 12, '0', '深圳示范站仓库', 1, CURRENT_TIMESTAMP,
     'H2 dev 初始入库', 'admin', CURRENT_TIMESTAMP);

insert into device_inspection
    (id, power_station_id, power_station_name, device_code, device_name, inspection_start_time, inspection_end_time,
     inspection_staff, inspection_result, inspection_type, spare_part_name_or_number, estimated_power_loss, annex,
     remark, create_by, create_time)
values
    ('INS001', 'PS001', '深圳示范光伏电站', 'INV001', '1# 逆变器', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
     '运维员A', '运行正常，散热风道已清理', '0', '', 0, '', 'H2 dev 演示点检', 'admin', CURRENT_TIMESTAMP);
