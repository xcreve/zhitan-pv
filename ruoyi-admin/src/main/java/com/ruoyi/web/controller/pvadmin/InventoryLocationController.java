package com.ruoyi.web.controller.pvadmin;

import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.pvadmin.domain.dto.InventoryLocationDTO;
import com.ruoyi.pvadmin.service.IInventoryLocationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;

import jakarta.annotation.Resource;

/**
 * 电站维护Controller
 */
@Tag(name = "库存地点")
@RestController
@RequestMapping("/inv-loc")
public class InventoryLocationController extends BaseController {

    @Resource
    IInventoryLocationService service;

    @GetMapping("/list")
    @Operation(summary = "查询库存地点维护列表")
    public AjaxResult list() {
        return success(service.getList());
    }

    @PostMapping("/create")
    @Operation(summary = "创建库存地点")
    public AjaxResult create(@RequestBody InventoryLocationDTO dto) {
        service.create(dto);
        return success();
    }

    @PutMapping("/edit")
    @Operation(summary = "编辑库存地点")
    public AjaxResult edit(@RequestBody InventoryLocationDTO dto) {
        service.edit(dto);
        return success();
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "删除库存地点")
    public AjaxResult delete(@PathVariable("id") String id) {
        service.delete(id);
        return success();
    }
}
