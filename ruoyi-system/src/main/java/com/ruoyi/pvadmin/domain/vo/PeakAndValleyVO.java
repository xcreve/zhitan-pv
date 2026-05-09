package com.ruoyi.pvadmin.domain.vo;

import com.ruoyi.common.annotation.Excel;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * 尖峰平谷时段统计页面展示
 */
@Data
@Schema(description = "尖峰平谷时段统计页面展示")
public class PeakAndValleyVO {

    /**
     * 合计-耗电量
     */
    @Excel(name = "尖-耗电量", width = 15)
    @Schema(description = "合计-耗电量")
    private BigDecimal totalPowerConsumption;

    /**
     * 合计-耗电量
     */
    @Schema(description = "合计-费用")
    private BigDecimal totalPowerCost;

    /**
     * 尖-耗电量
     */
    @Excel(name = "尖-耗电量", width = 15)
    @Schema(description = "尖-耗电量")
    private BigDecimal tipPowerConsumption;

    /**
     * 尖-耗电量占比
     */
    @Excel(name = "尖-耗电量占比", width = 15)
    @Schema(description = "尖-耗电量占比")
    private BigDecimal tipPowerProportion;

    /**
     * 尖-电费
     */
    @Excel(name = "尖-电费", width = 15)
    @Schema(description = "尖-电费")
    private BigDecimal tipPowerCost;

    /**
     * 尖-费用占比
     */
    @Excel(name = "尖-费用占比", width = 15)
    @Schema(description = "尖-费用占比")
    private BigDecimal tipPowerCostProportion;

    /**
     * 峰-耗电量
     */
    @Excel(name = "峰-耗电量", width = 15)
    @Schema(description = "峰-耗电量")
    private BigDecimal peakPowerConsumption;

    /**
     * 峰-耗电量占比
     */
    @Excel(name = "峰-耗电量占比", width = 15)
    @Schema(description = "峰-耗电量占比")
    private BigDecimal peakPowerProportion;

    /**
     * 峰-电费
     */
    @Excel(name = "峰-电费", width = 15)
    @Schema(description = "峰-电费")
    private BigDecimal peakPowerCost;

    /**
     * 峰-费用占比
     */
    @Excel(name = "峰-费用占比", width = 15)
    @Schema(description = "峰-费用占比")
    private BigDecimal peakPowerCostProportion;

    /**
     * 平-耗电量
     */
    @Excel(name = "平-耗电量", width = 15)
    @Schema(description = "平-耗电量")
    private BigDecimal flatPowerConsumption;

    /**
     * 平-耗电占比
     */
    @Excel(name = "平-耗电占比", width = 15)
    @Schema(description = "平-耗电占比")
    private BigDecimal flatPowerProportion;

    /**
     * 平-电费
     */
    @Excel(name = "平-电费", width = 15)
    @Schema(description = "平-电费")
    private BigDecimal flatPowerCost;

    /**
     * 平-费用占比
     */
    @Excel(name = "平-费用占比", width = 15)
    @Schema(description = "平-费用占比")
    private BigDecimal flatPowerCostProportion;

    /**
     * 谷-耗电量
     */
    @Excel(name = "谷-耗电量", width = 15)
    @Schema(description = "谷-耗电量")
    private BigDecimal troughPowerConsumption;

    /**
     * 谷-耗电占比
     */
    @Schema(description = "谷-耗电占比")
    private BigDecimal troughPowerProportion;

    /**
     * 谷-电费
     */
    @Schema(description = "谷-电费")
    private BigDecimal troughPowerCost;

    /**
     * 谷-费用占比
     */
    @Schema(description = "谷-费用占比")
    private BigDecimal troughPowerCostProportion;

    /**
     * 深谷-耗电量
     */
    @Excel(name = "深谷-耗电量", width = 15)
    @Schema(description = "深谷-耗电量")
    private BigDecimal deepPowerConsumption;

    /**
     * 深谷-耗电占比
     */
    @Schema(description = "深谷-耗电占比")
    private BigDecimal deepPowerProportion;

    /**
     * 深谷-电费
     */
    @Schema(description = "深谷-电费")
    private BigDecimal deepPowerCost;

    /**
     * 深谷-费用占比
     */
    @Schema(description = "深谷-费用占比")
    private BigDecimal deepPowerCostProportion;

    /**
     * 耗电量列表
     */
    @Schema(description = "耗电量列表")
    private List<PeakValleyTimeSharingLineStatisticsVO> powerConsumptionList;

    /**
     * 费用列表
     */
    @Schema(description = "费用列表")
    private List<PeakValleyTimeSharingLineStatisticsVO> costList;

}