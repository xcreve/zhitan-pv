package com.ruoyi.pvadmin.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ruoyi.common.core.domain.BaseEntity;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.constraints.NotNull;
import java.util.Date;

/**
 * 尖峰平谷dto
 **/
@Data
public class PeakValleyQueryDTO extends BaseEntity {

    @NotNull(message = "统计时间不能为空")
    @JsonFormat(pattern = "yyyy-MM")
    @DateTimeFormat(pattern = "yyyy-MM")
    @Parameter(description = "统计时间")
    private Date dateTime;

    @Parameter(description = "电站id")
    private String powerStationId;

    @Parameter(description = "设备id")
    private String deviceId;
}