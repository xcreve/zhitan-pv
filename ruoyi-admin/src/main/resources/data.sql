insert into sys_dept
values (100, 0, '0', '若依科技', 0, '若依', '15888888888', 'ry@qq.com', '0', '0', 'admin', CURRENT_TIMESTAMP, '', null);
insert into sys_dept
values (101, 100, '0,100', '深圳总公司', 1, '若依', '15888888888', 'ry@qq.com', '0', '0', 'admin', CURRENT_TIMESTAMP, '', null);
insert into sys_dept
values (103, 101, '0,100,101', '研发部门', 1, '若依', '15888888888', 'ry@qq.com', '0', '0', 'admin', CURRENT_TIMESTAMP, '', null);

insert into sys_user
values (1, 103, 'admin', '若依', '00', 'ry@163.com', '15888888888', '1', '',
        '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', '0', '0', '127.0.0.1',
        CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP, '', null, '管理员');

insert into sys_post
values (1, 'ceo', '董事长', 1, '0', 'admin', CURRENT_TIMESTAMP, '', null, '');

insert into sys_user_post values (1, 1);

insert into sys_role
values (1, '超级管理员', 'admin', 1, '1', 1, 1, '0', '0', 'admin', CURRENT_TIMESTAMP, '', null, '超级管理员');

insert into sys_user_role values (1, 1);

insert into sys_menu
values (1, '系统管理', 0, 1, 'system', 'Layout', '', 1, 0, 'M', '0', '0', '', 'system', 'admin', CURRENT_TIMESTAMP,
        '', null, '系统管理目录');
insert into sys_menu
values (100, '用户管理', 1, 1, 'user', 'system/user/index', '', 1, 0, 'C', '0', '0', 'system:user:list', 'user', 'admin',
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
