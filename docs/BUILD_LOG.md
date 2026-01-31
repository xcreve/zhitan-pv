# Build log excerpt

Command executed:

```
mvn -Denforcer.skip=true -e clean package
```

Excerpt around the current failure (no NoSuchFieldError reproduced; compilation fails due to missing Lombok on ruoyi-system):

```
[ERROR] /workspace/zhitan-pv/ruoyi-system/src/main/java/com/ruoyi/pvadmin/domain/dto/AlarmQueryDTO.java:[5,14] package lombok does not exist
[ERROR] /workspace/zhitan-pv/ruoyi-system/src/main/java/com/ruoyi/pvadmin/domain/dto/AlarmQueryDTO.java:[12,2] cannot find symbol
[ERROR]   symbol: class Data
[ERROR] /workspace/zhitan-pv/ruoyi-system/src/main/java/com/ruoyi/pvadmin/domain/dto/AlarmHandlingDTO.java:[3,14] package lombok does not exist
[ERROR] /workspace/zhitan-pv/ruoyi-system/src/main/java/com/ruoyi/pvadmin/domain/dto/AlarmHandlingDTO.java:[10,2] cannot find symbol
[ERROR]   symbol: class Data
[ERROR] /workspace/zhitan-pv/ruoyi-system/src/main/java/com/ruoyi/pvadmin/domain/vo/HomeAlarmVO.java:[3,14] package lombok does not exist
[ERROR] /workspace/zhitan-pv/ruoyi-system/src/main/java/com/ruoyi/pvadmin/domain/vo/HomeAlarmVO.java:[8,2] cannot find symbol
[ERROR]   symbol: class Data
[ERROR] /workspace/zhitan-pv/ruoyi-system/src/main/java/com/ruoyi/pvadmin/domain/vo/AlarmLevelAnalysisVO.java:[4,14] package lombok does not exist
[ERROR] /workspace/zhitan-pv/ruoyi-system/src/main/java/com/ruoyi/pvadmin/domain/vo/AlarmLevelAnalysisVO.java:[11,2] cannot find symbol
[ERROR]   symbol: class Data
[ERROR] /workspace/zhitan-pv/ruoyi-system/src/main/java/com/ruoyi/pvadmin/domain/model/AlarmLevelAnalysisItem.java:[3,14] package lombok does not exist
[ERROR] /workspace/zhitan-pv/ruoyi-system/src/main/java/com/ruoyi/pvadmin/domain/model/AlarmLevelAnalysisItem.java:[10,2] cannot find symbol
[ERROR]   symbol: class Data
```

---

## 2026-01-31 build

Command executed:

```
JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 PATH=/usr/lib/jvm/java-8-openjdk-amd64/bin:$PATH mvn -DskipTests -Denforcer.skip=true clean package
```

Result: **BUILD SUCCESS** (ruoyi-admin packaged successfully). Warnings were limited to Lombok-generated equals/hashCode callSuper notices and a mysql-connector relocation warning.
