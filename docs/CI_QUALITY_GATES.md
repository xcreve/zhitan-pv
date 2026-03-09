# CI 质量门禁说明

## 目标

在现有构建与依赖扫描基础上，补充“依赖准入 + 静态质量”第二道门禁，采用**先告警、后阻断**策略，避免一次性引入大量噪音。

## 当前工作流

### 1) Build（阻断项）
- Workflow: `.github/workflows/ci.yml`
- 作用：JDK8 下执行 `mvn -DskipTests clean package`
- 策略：**阻断**（失败即 CI 失败）

### 2) Dependency-Check（告警项）
- Workflow: `.github/workflows/dependency-check.yml`
- 作用：OWASP 依赖漏洞扫描，上传 HTML/JSON 报告
- 策略：当前按扫描结果与执行情况告警；是否阻断由后续治理策略决定
- 依赖条件：需要仓库 Secret `NVD_API_KEY`

### 3) Dependency-Review（告警项）
- Workflow: `.github/workflows/ci-quality-gates.yml`
- Job: `dependency-review`
- 作用：PR 级依赖变更准入检查
- 策略：第一阶段**非阻断**（`continue-on-error: true`）
- 限制说明：在部分仓库/事件场景（例如 fork PR、依赖图或权限限制）可能受限；受限时不作为阻塞发布条件，仍以 dependency-check 作为主要依赖风险扫描手段

### 4) SpotBugs（告警项）
- Workflow: `.github/workflows/ci-quality-gates.yml`
- Job: `spotbugs`
- 作用：静态缺陷扫描（优先真实风险）
- 执行：`mvn -DskipTests -Denforcer.skip=true clean package com.github.spotbugs:spotbugs-maven-plugin:4.8.6.6:spotbugs`
- 报告：上传 `**/target/spotbugsXml.xml` 与 `**/target/spotbugs.html`
- 策略：第一阶段**非阻断**（`continue-on-error: true`）

## 当前门禁策略总览

- 阻断项：`build`
- 告警项：`dependency-check`、`dependency-review`、`spotbugs`

## 后续建议

1. 先稳定 2~4 周告警数据，沉淀误报与可快速修复项。
2. 对依赖高危（CVSS 高分）与 SpotBugs 高置信问题逐步收敛后，再考虑将部分规则升级为阻断。
3. Checkstyle 暂不优先引入：当前阶段优先“缺陷风险”而非“风格一致性”，避免短期噪音压过安全收益。
