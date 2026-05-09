<p align="center">
	<img alt="logo" src="readme/logo-chinese.png" height="150" width="150">
</p>
<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">智碳光伏管理系统</h1>
<p align="center">基于若依框架前后端分离版本</p>
<p align="center">
</p>

## 平台简介

智碳光伏发电监测管理系统，基于Spring Boot + Vue前后端分离版本。是一种基于物联网、大数据及云计算技术的智能化管理平台，用于实时监控、分析和优化光伏电站的运行状态，旨在提升发电效率、保障系统安全、降低运维成本，并为电站的长期稳定运行提供数据支持。

* 前端采用Vue、Element UI。
* 后端采用Spring Boot、Spring Security、Redis & Jwt。
* 权限认证使用Jwt，支持多终端认证系统。
* 支持加载动态权限菜单，多方式轻松权限控制。
* 高效率开发，使用代码生成器可以一键生成前后端代码。

## 内置功能

### 1. 实时监测
#### 1.1 实时数据
#### 1.2 电站实时状态
#### 1.3 设备实时状态
### 2. 统计分析
#### 2.1 电站发电统计
#### 2.2 设备发电统计
#### 2.3 同比分析
#### 2.4 环比分析
### 3. 尖峰平谷
#### 3.1 图表统计
#### 3.2 报表统计
### 4. 电能质量
#### 4.1 负荷分析
#### 4.2 三相不平衡分析
#### 4.3 功率因数分析
### 5. 智能报警
### 6. 运维管理
#### 6.1 电站管理
#### 6.2 设备管理
#### 6.3 设备类型管理
#### 6.4 设备点检
#### 6.5 备品备件
#### 6.6 峰平谷配置
### 7. 移动端（小程序）
#### 7.1 首页概览
#### 7.2 实时监测
#### 7.3 智能报警

## UI展示


![输入图片说明](readme/img/首页.jpg)
    首页

![输入图片说明](readme/img/电站实时状态.jpg)
    电站实时状态 

![输入图片说明](readme/img/电站发电统计.jpg)
    电站发电统计
 
![输入图片说明](readme/img/环比分析.jpg)
    环比分析 

![输入图片说明](readme/img/同比分析.jpg)
    同比分析 

![输入图片说明](readme/img/峰平谷-图表统计.jpg)
    峰平谷分析 

<p>
    <img src="readme/img/小程序-首页.jpg" width="18%">
    <img src="readme/img/小程序-电站监测.jpg" width="18%">
</p>
<p>
    <img src="readme/img/小程序-我的.jpg" width="20%">
    <img src="readme/img/小程序-实时监测.jpg" width="20%">
    <img src="readme/img/小程序-智能报警.jpg" width="20%">>
</p>
    小程序



- guestUser/guest@123456

演示地址：  


## 快速启动（后端）

请参考升级过程文档：`docs/UPGRADE_*.md`。

补充说明：
- 当前后端基线：RuoYi 3.9.2 / Spring Boot 4.0.3 / JDK 17（实测兼容 JDK 21）。
- dev profile 默认使用 H2 内存库启动，端口 9050；prod profile 使用 MySQL。
- 启动命令：`java -jar ruoyi-admin/target/ruoyi-admin.jar --spring.profiles.active=dev`。
- H2 Console（仅 dev）：`http://localhost:9050/h2-console`。

## 快速启动（前端）

- 前端基线：Vue 3.5 + TypeScript + Vite 6 + Element Plus 2.13。
- 启动命令：`cd ruoyi-ui && npm install && npm run dev`。
- 默认登录：`admin / admin123`（dev profile captcha 关闭）。

## 升级历史

### v3.9.2 全栈现代化升级（2026-05）

- **后端**：Spring Boot 2.5.15 → 4.0.3，JDK 1.8 → 17，javax → jakarta，Spring Security 5.7 → 6.x
- **前端**：自研 Vue3 → 官方 RuoYi-Vue3 TypeScript 蓝本，Pinia 2 → 3，Vite 5 → 6.4
- **依赖**：MyBatis-Plus 3.5.16、Druid 4-starter、Springdoc OpenAPI 3.0、Pagehelper 2.1
- **业务**：pvadmin 业务包（21 模块）整体迁回新基线；微信小程序订阅消息保持裸 HTTP；InfluxDB client 6.10
- **菜单**：从前端硬编码改为后端 sys_menu 动态注入（SQL：`sql/upgrade/pvadmin_menus.sql`）

升级过程文档：
- [docs/UPGRADE_INVENTORY.md](docs/UPGRADE_INVENTORY.md) - 业务盘点
- [docs/UPGRADE_REF_NOTES.md](docs/UPGRADE_REF_NOTES.md) - 官方蓝本对照
- [docs/UPGRADE_SMOKE.md](docs/UPGRADE_SMOKE.md) - 全栈冒烟报告

非阻塞性遗留观察（建议后续小修）：
- `pvadmin/influxdb/InfluxDBRepository.java:44` 把"实时数据库连接成功"日志级别从 ERROR 改为 INFO
- pvadmin 内 11 处 `Math.toIntExact(MP.selectCount())` 可重构为变量类型 long
- 前端主 chunk 1.7MB 可通过 `build.rollupOptions.manualChunks` 拆分 echarts/element-plus
- vue-tsc 308 条历史欠债集中在官方 monitor/tool/system 模板，可独立清理
- dev profile captchaEnabled=false，生产部署前确认开启

## 沟通交流

扫码添加微信交流，加微信请备注：pv。

<p align="center">
  <img src="" width=50% height=50%>
</p>
