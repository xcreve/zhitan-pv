package com.ruoyi.web.controller.pvadmin;

import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.pvadmin.domain.dto.DeviceTypeIndexSubmitDTO;
import com.ruoyi.pvadmin.domain.dto.DeviceTypeQueryDTO;
import com.ruoyi.pvadmin.domain.dto.DeviceTypeSubmitDTO;
import com.ruoyi.pvadmin.domain.vo.DeviceTypeListVO;
import com.ruoyi.pvadmin.service.IDeviceTypeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.annotation.Resource;
import java.util.List;

/**
 * 设备类型以及点位管理
 */
@RestController
@Tag(name = "设备类型以及点位管理")
@RequestMapping("/deviceType")
public class DeviceTypeController extends BaseController {
    @Resource
    private IDeviceTypeService service;

    /**
     * 查询列表
     */
    @GetMapping("/list")
    @Operation(summary = "查询列表")
    public TableDataInfo list(DeviceTypeQueryDTO request) {
        startPage();
        List<DeviceTypeListVO> list = service.pagedList(request);
        return getDataTable(list);
    }

    @GetMapping("/index/{id}")
    @Operation(summary = "列出点位模板")
    public AjaxResult listIndex(@PathVariable("id") String id) {
        return AjaxResult.success(service.listIndex(id));
    }

    @PostMapping("/create")
    @Operation(summary = "创建设备类型")
    public AjaxResult create(@Validated @RequestBody DeviceTypeSubmitDTO request) {
        service.create(request);
        return AjaxResult.success();
    }

    @PostMapping("/edit")
    @Operation(summary = "编辑设备类型")
    public AjaxResult edit(@Validated @RequestBody DeviceTypeSubmitDTO request) {
        service.edit(request);
        return AjaxResult.success();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除设备类型")
    public AjaxResult delete(@PathVariable("id") String id) {
        service.delete(id);
        return AjaxResult.success();
    }

    /**
     * 新增/编辑点位
     */
    @PostMapping("/index/{id}")
    @Operation(summary = "新增/编辑设备类型模板")
    public AjaxResult editIndex(@PathVariable("id") String id, @RequestBody List<DeviceTypeIndexSubmitDTO> request) {
        service.editIndex(id, request);
        return AjaxResult.success();
    }
}
