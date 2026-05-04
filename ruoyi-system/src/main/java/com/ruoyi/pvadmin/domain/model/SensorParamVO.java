package com.ruoyi.pvadmin.domain.model;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

/**
 * 传感器数据
 *
 * @Author: Zhujw
 * @Date: 2022/11/13
 */
@Data
public class SensorParamVO {

    @Schema(description = "设备名称")
    private String deviceName;

    /**
     * 离线报警
     */
    private boolean offline;

    @Schema(description = "点位信息")
    private List<RealTimeIndexParam> indexArray;
}