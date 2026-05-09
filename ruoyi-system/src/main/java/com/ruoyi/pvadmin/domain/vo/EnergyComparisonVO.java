package com.ruoyi.pvadmin.domain.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 能耗同比、环比 VO
 */
@Data
public class EnergyComparisonVO {

    /**
     * 设备名称
     */
    @Schema(description = "设备名称")
    private String powerStationName;

    /**
     * 本期时间
     */
    @Schema(description = "本期时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date currentTime;

    /**
     * 本期值
     */
    @Schema(description = "本期值")
    private BigDecimal currentValue;

    /**
     * 对比时间
     */
    @Schema(description = "对比时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date compareTime;

    /**
     * 对比值
     */
    @Schema(description = "对比值")
    private BigDecimal contrastValues;

    /**
     * 同比值
     * 同比增长率=（本期值-去年同期值）/去年同期值×100%
     * 环比值
     * 环比增长率=（本期值-上期值）/上期值×100%
     */
    @Schema(description = "同比增长率/环比增长率")
    private BigDecimal ratio;
}