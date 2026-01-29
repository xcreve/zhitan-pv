# 升级后冒烟验证清单

> 说明：以下以后端启动在 `http://localhost:8080` 为例，请根据实际端口调整。

## 0. 前置依赖
- MySQL 已初始化并执行升级脚本。
- Redis 正常可用。
- 后端服务已启动，返回启动日志关键字："若依启动成功"。

## 1. 登录
```bash
curl -X POST "http://localhost:8080/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123","code":"","uuid":""}'
```
**期望字段**：`code=200`，`token` 不为空。

> 若启用了验证码，请先请求验证码接口并携带 `code/uuid`。

## 2. 获取用户信息
```bash
curl -X GET "http://localhost:8080/getInfo" \
  -H "Authorization: Bearer <token>"
```
**期望字段**：`user`、`roles`、`permissions`。

## 3. 获取菜单路由
```bash
curl -X GET "http://localhost:8080/getRouters" \
  -H "Authorization: Bearer <token>"
```
**期望字段**：`data` 数组包含路由节点。

## 4. pvadmin 业务接口（示例）
### 4.1 设备列表
```bash
curl -X GET "http://localhost:8080/device/list" \
  -H "Authorization: Bearer <token>"
```
**期望字段**：`rows`、`total`。

### 4.2 设备详情
```bash
curl -X GET "http://localhost:8080/device/1" \
  -H "Authorization: Bearer <token>"
```
**期望字段**：`data` 对象。

## 常见故障排查
1. **401 未授权**：确认 `Authorization` 头是否为 `Bearer <token>`，以及 token 未过期。
2. **验证码失败**：检查验证码开关与缓存（Redis）是否正常。
3. **菜单为空**：检查账号权限与 `sys_menu` 数据是否初始化。
4. **数据库报错**：确认执行了 `sql/upgrade/3.8.6_to_3.9.1.sql`，并保持业务表不被覆盖。
