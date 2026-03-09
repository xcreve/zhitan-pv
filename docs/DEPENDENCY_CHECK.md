# 依赖安全扫描记录（OWASP Dependency-Check）

## 扫描方式
使用 OWASP Dependency-Check Maven 插件：

```
mvn -DskipTests org.owasp:dependency-check-maven:check \
  -Dformat=JSON \
  -DoutputDirectory=dependency-check-report \
  -DfailBuildOnCVSS=11 \
  -DfailOnError=false
```


## GitHub Secrets 配置（NVD_API_KEY）
- 路径：`Settings → Secrets and variables → Actions → New repository secret`
- 名称：`NVD_API_KEY`
- 值：NVD 官方申请的 API Key

> 缺少 API key 时，NVD 数据库更新会非常慢，扫描可能长时间卡住或被中断。

## 首轮扫描结果
- 扫描在同步 NVD 数据库时提示缺少 API key，下载进度在约 3%～6% 阶段耗时过长。
- 为避免占用过久，本次扫描被手动终止；完整报告未生成。

## 修复建议（下一步）
1. 在 CI/本地配置 `NVD_API_KEY`（NVD 官方 API key），以加速数据库更新并完成扫描。
2. 扫描完成后优先处理 **CVSS ≥ 7.0** 的依赖项：
   - 重点关注 Web 容器、序列化/JSON 组件、HTTP 客户端等核心链路依赖。
3. 在升级依赖前对关键组件进行回归（登录/权限/路由/微信链路）。

## CI 建议
- 已添加 GitHub Actions 工作流 `.github/workflows/dependency-check.yml`，建议在仓库 Secrets 中配置 `NVD_API_KEY`，生成完整报告并上传为构建产物。

## dependency-review 说明（PR 级依赖准入）
- 已在 CI 中增加 `dependency-review-action`（见 `.github/workflows/ci-quality-gates.yml`）。
- 该检查在部分场景可能受限（例如 fork PR、权限或依赖图设置限制），因此第一阶段按**非阻断告警**运行。
- 若受限，不作为发布阻塞条件；依赖风险主扫描仍以 `dependency-check` 为准。
