package com.ruoyi.web.controller.pvadmin;


import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.domain.BaseEntity;
import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.pvadmin.domain.dto.AlarmHandlingDTO;
import com.ruoyi.pvadmin.domain.dto.AlarmQueryDTO;
import com.ruoyi.pvadmin.domain.vo.AlarmVO;
import com.ruoyi.pvadmin.service.IAlarmService;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 报警Controller
 */
@Tag(name = "报警管理")
@RestController
@RequestMapping("/alarm")
public class AlarmController extends BaseController {

    @Autowired
    private IAlarmService alarmService;

    /**
     * 查询报警列表
     */
    @GetMapping("/list")
    @Operation(summary = "查询报警列表")
    public TableDataInfo list(AlarmQueryDTO dto) {
        startPage();
        List<AlarmVO> list = alarmService.selectAlarmList(dto);
        return getDataTable(list);
    }

    /**
     * 首页-查询报警信息
     */
    @Operation(summary = "首页-查询报警信息")
    @GetMapping(value = "/listHomeAlarm")
    public AjaxResult listHomeAlarm() {
        return success(alarmService.listHomeAlarm(new BaseEntity()));
    }

    /**
     * 获取报警详细信息
     */
    @Operation(summary = "获取报警详细信息")
    @GetMapping(value = "/{id}")
    public AjaxResult getInfo(@PathVariable("id") String id) {
        if (StringUtils.isBlank(id)) {
            return AjaxResult.success(new AlarmVO());
        }

        return success(alarmService.selectAlarmById(id));
    }

    /**
     * 处理报警信息
     */
    @Operation(summary = "处理报警信息")
    @PostMapping(value = "/alarmHandling")
    public AjaxResult alarmHandling(@RequestBody AlarmHandlingDTO dto) {
        alarmService.alarmHandling(dto);
        return success();
    }

    /**
     * 查询报警等级分析
     */
    @Operation(summary = "查询报警等级分析")
    @GetMapping(value = "/getAlarmLevelAnalysis")
    public AjaxResult getAlarmLevelAnalysis() {
        return success(alarmService.getAlarmLevelAnalysis());
    }

    /**
     * 根据id设置报警等级
     */
    @Operation(summary = "根据id设置报警等级")
    @GetMapping(value = "/editAlarmLevel")
    public AjaxResult editAlarmLevel(@RequestParam(value = "alarmId", defaultValue = "-1") String alarmId,
                                     @RequestParam(value = "level", defaultValue = "1") Integer level) {
        return toAjax(alarmService.editAlarmLevel(alarmId, level));
    }

}