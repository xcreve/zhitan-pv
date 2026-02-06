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
    remark varchar(500) default null
);
