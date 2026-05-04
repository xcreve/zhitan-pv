package com.ruoyi.pvadmin.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ruoyi.common.core.domain.BaseEntity;
import com.ruoyi.common.core.page.PageDomain;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.Data;
import org.springframework.data.domain.PageRequest;

import java.util.Date;

/**
 * 备品备件 操作记录 dto
 **/
@Data
public class SparePartsRecordQueryDTO extends BaseEntity {


    @Parameter(description = "名称")
    private String name;

    @Parameter(description = "电站id")
    private String powerStationId;

    @Parameter(description = "操作记录 出库、入库")
    private String operationType;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Parameter(description = "出入库开始时间")
    private Date startDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Parameter(description = "出入库结束时间")
    private Date endDate;
}