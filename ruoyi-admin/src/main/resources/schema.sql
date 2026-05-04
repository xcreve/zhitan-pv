drop table if exists sys_user_role;
drop table if exists sys_role_menu;
drop table if exists sys_role_dept;
drop table if exists sys_user_post;
drop table if exists sys_menu;
drop table if exists sys_role;
drop table if exists sys_user;
drop table if exists sys_dept;
drop table if exists sys_post;
drop table if exists sys_config;
drop table if exists sys_dict_data;
drop table if exists sys_dict_type;
drop table if exists sys_logininfor;
drop table if exists sys_oper_log;
drop table if exists sys_job;
drop table if exists wx_subscribe;
drop table if exists wx_user;
drop table if exists device_inspection_annex;
drop table if exists spare_parts_record;
drop table if exists spare_parts;
drop table if exists inventory_location;
drop table if exists electricity_type_setting_item;
drop table if exists electricity_type_setting;
drop table if exists electricity_data_item;
drop table if exists data_item;
drop table if exists alarm;
drop table if exists device_index;
drop table if exists device_type_index_template;
drop table if exists device;
drop table if exists device_type;
drop table if exists device_inspection;
drop table if exists power_station;

create table sys_dept (
    dept_id bigint auto_increment primary key,
    parent_id bigint default 0,
    ancestors varchar(50) default '',
    dept_name varchar(30) default '',
    order_num int default 0,
    leader varchar(20) default null,
    phone varchar(11) default null,
    email varchar(50) default null,
    status char(1) default '0',
    del_flag char(1) default '0',
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp
);

create table sys_user (
    user_id bigint auto_increment primary key,
    dept_id bigint default null,
    user_name varchar(30) not null,
    nick_name varchar(30) not null,
    user_type varchar(2) default '00',
    email varchar(50) default '',
    phonenumber varchar(11) default '',
    sex char(1) default '0',
    avatar varchar(100) default '',
    password varchar(100) default '',
    status char(1) default '0',
    del_flag char(1) default '0',
    login_ip varchar(128) default '',
    login_date timestamp,
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp,
    remark varchar(500) default null
);

create table sys_post (
    post_id bigint auto_increment primary key,
    post_code varchar(64) not null,
    post_name varchar(50) not null,
    post_sort int not null,
    status char(1) not null,
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp,
    remark varchar(500) default null
);

create table sys_role (
    role_id bigint auto_increment primary key,
    role_name varchar(30) not null,
    role_key varchar(100) not null,
    role_sort int not null,
    data_scope char(1) default '1',
    menu_check_strictly tinyint default 1,
    dept_check_strictly tinyint default 1,
    status char(1) not null,
    del_flag char(1) default '0',
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp,
    remark varchar(500) default null
);

create table sys_menu (
    menu_id bigint auto_increment primary key,
    menu_name varchar(50) not null,
    parent_id bigint default 0,
    order_num int default 0,
    path varchar(200) default '',
    component varchar(255) default null,
    query varchar(255) default null,
    is_frame int default 1,
    is_cache int default 0,
    menu_type char(1) default '',
    visible char(1) default '0',
    status char(1) default '0',
    perms varchar(100) default null,
    icon varchar(100) default '#',
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp,
    remark varchar(500) default ''
);

create table sys_user_role (
    user_id bigint not null,
    role_id bigint not null,
    primary key (user_id, role_id)
);

create table sys_role_menu (
    role_id bigint not null,
    menu_id bigint not null,
    primary key (role_id, menu_id)
);

create table sys_role_dept (
    role_id bigint not null,
    dept_id bigint not null,
    primary key (role_id, dept_id)
);

create table sys_user_post (
    user_id bigint not null,
    post_id bigint not null,
    primary key (user_id, post_id)
);

create table sys_oper_log (
    oper_id bigint auto_increment primary key,
    title varchar(50) default '',
    business_type int default 0,
    method varchar(100) default '',
    request_method varchar(10) default '',
    operator_type int default 0,
    oper_name varchar(50) default '',
    dept_name varchar(50) default '',
    oper_url varchar(255) default '',
    oper_ip varchar(128) default '',
    oper_location varchar(255) default '',
    oper_param varchar(2000) default '',
    json_result varchar(2000) default '',
    status int default 0,
    error_msg varchar(2000) default '',
    oper_time timestamp,
    cost_time bigint default 0
);

create table sys_dict_type (
    dict_id bigint auto_increment primary key,
    dict_name varchar(100) default '',
    dict_type varchar(100) default '',
    status char(1) default '0',
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp,
    remark varchar(500) default null
);

create table sys_dict_data (
    dict_code bigint auto_increment primary key,
    dict_sort int default 0,
    dict_label varchar(100) default '',
    dict_value varchar(100) default '',
    dict_type varchar(100) default '',
    css_class varchar(100) default null,
    list_class varchar(100) default null,
    is_default char(1) default 'N',
    status char(1) default '0',
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp,
    remark varchar(500) default null
);

create table sys_config (
    config_id int auto_increment primary key,
    config_name varchar(100) default '',
    config_key varchar(100) default '',
    config_value varchar(500) default '',
    config_type char(1) default 'N',
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp,
    remark varchar(500) default null
);

create table sys_logininfor (
    info_id bigint auto_increment primary key,
    user_name varchar(50) default '',
    ipaddr varchar(128) default '',
    login_location varchar(255) default '',
    browser varchar(50) default '',
    os varchar(50) default '',
    status char(1) default '0',
    msg varchar(255) default '',
    login_time timestamp
);

create table sys_job (
    job_id bigint auto_increment primary key,
    job_name varchar(64) not null,
    job_group varchar(64) not null,
    invoke_target varchar(500) not null,
    cron_expression varchar(255) default '',
    misfire_policy varchar(20) default '3',
    concurrent char(1) default '1',
    status char(1) default '0',
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp,
    remark varchar(500) default null
);

create table power_station (
    id varchar(64) primary key,
    parent_id varchar(64) default null,
    code varchar(64) default '',
    name varchar(100) default '',
    subsidized_prices decimal(18, 4) default 0,
    installed_capacity decimal(18, 4) default 0,
    grid_voltage decimal(18, 4) default 0,
    lon decimal(18, 6) default null,
    lat decimal(18, 6) default null,
    owning_user_id varchar(64) default null,
    user_id bigint default 1,
    dept_id bigint default 103,
    remark varchar(500) default '',
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp
);

create table device_type (
    id varchar(64) primary key,
    name varchar(100) default '',
    description varchar(500) default '',
    remark varchar(500) default '',
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp
);

create table device (
    id varchar(64) primary key,
    power_station_id varchar(64) default null,
    code varchar(64) default '',
    name varchar(100) default '',
    device_type_id varchar(64) default null,
    capacity decimal(18, 4) default 0,
    factory varchar(100) default '',
    rated_ac_power decimal(18, 4) default 0,
    grid_type varchar(64) default '',
    module_peak_power decimal(18, 4) default 0,
    ammeter tinyint default 0,
    user_id bigint default 1,
    dept_id bigint default 103,
    remark varchar(500) default '',
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp
);

create table device_type_index_template (
    id varchar(64) primary key,
    device_type_id varchar(64) default null,
    device_type_name varchar(100) default '',
    name varchar(100) default '',
    code varchar(64) default '',
    index_type varchar(32) default '',
    unit varchar(32) default '',
    tag_key varchar(100) default '',
    remark varchar(500) default '',
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp
);

create table device_index (
    id varchar(64) primary key,
    index_id varchar(64) default null,
    device_id varchar(64) default null,
    index_code varchar(128) default '',
    index_type varchar(32) default '',
    calc_index varchar(500) default '',
    unit varchar(32) default '',
    tag_key varchar(100) default '',
    factor decimal(18, 4) default 1,
    remark varchar(500) default '',
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp
);

create table alarm (
    id varchar(64) primary key,
    data_time timestamp,
    err_code varchar(64) default '',
    device_code varchar(64) default '',
    error_description varchar(500) default '',
    solution varchar(500) default '',
    level int default 1,
    status varchar(16) default '1',
    handlers varchar(64) default '',
    handlers_name varchar(64) default '',
    processing_time timestamp,
    image_url varchar(500) default '',
    remark varchar(500) default '',
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp
);

create table data_item (
    device_id varchar(64) default null,
    time_code varchar(64) default '',
    time_type varchar(16) default '',
    data_time timestamp,
    begin_time timestamp,
    end_time timestamp,
    value decimal(18, 4) default 0,
    remark varchar(500) default '',
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp
);

create table electricity_data_item (
    device_id varchar(64) default null,
    data_time timestamp,
    type varchar(16) default '',
    begin_time timestamp,
    end_time timestamp,
    value decimal(18, 4) default 0,
    cost decimal(18, 4) default 0,
    price decimal(18, 4) default 0,
    remark varchar(500) default '',
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp
);

create table electricity_type_setting (
    id varchar(64) primary key,
    begin_time timestamp,
    end_time timestamp,
    remark varchar(500) default '',
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp
);

create table electricity_type_setting_item (
    id varchar(64) primary key,
    parent_id varchar(64) default null,
    type varchar(16) default '',
    begin_time timestamp,
    end_time timestamp,
    electricity_price decimal(18, 4) default 0,
    remark varchar(500) default '',
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp
);

create table inventory_location (
    id bigint auto_increment primary key,
    location varchar(100) default '',
    remark varchar(500) default ''
);

create table spare_parts (
    id varchar(64) primary key,
    code varchar(64) default '',
    name varchar(100) default '',
    specs varchar(100) default '',
    power_station_id varchar(64) default null,
    amount bigint default 0,
    user_id bigint default 1,
    dept_id bigint default 103,
    location varchar(100) default '',
    location_id bigint default null,
    remark varchar(500) default '',
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp
);

create table spare_parts_record (
    id varchar(64) primary key,
    code varchar(64) default '',
    name varchar(100) default '',
    specs varchar(100) default '',
    power_station_id varchar(64) default null,
    amount bigint default 0,
    status varchar(16) default '0',
    user_id bigint default 1,
    dept_id bigint default 103,
    location varchar(100) default '',
    location_id bigint default null,
    movement_date timestamp,
    remark varchar(500) default '',
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp
);

create table device_inspection (
    id varchar(64) primary key,
    power_station_id varchar(64) default null,
    power_station_name varchar(100) default '',
    device_code varchar(64) default '',
    device_name varchar(100) default '',
    inspection_start_time timestamp,
    inspection_end_time timestamp,
    inspection_staff varchar(64) default '',
    inspection_result varchar(500) default '',
    inspection_type varchar(16) default '0',
    spare_part_name_or_number varchar(200) default '',
    estimated_power_loss decimal(18, 4) default 0,
    annex varchar(500) default '',
    user_id bigint default 1,
    dept_id bigint default 103,
    remark varchar(500) default '',
    create_by varchar(64) default '',
    create_time timestamp,
    update_by varchar(64) default '',
    update_time timestamp
);

create table device_inspection_annex (
    id bigint auto_increment primary key,
    device_inspection_id varchar(64) default null,
    annex varchar(500) default ''
);

create table wx_user (
    id bigint auto_increment primary key,
    user_id bigint default null,
    open_id varchar(128) default ''
);

create table wx_subscribe (
    id bigint auto_increment primary key,
    template_id varchar(128) default '',
    open_id varchar(128) default '',
    to_user_name varchar(64) default ''
);
