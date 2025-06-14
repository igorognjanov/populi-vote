package com.populivote.controller;

import com.populivote.domain.ElectoralDistrict;
import com.populivote.dto.ElectoralDistrictDto;
import com.populivote.mapper.ElectoralDistrictMapper;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/electoral-district")
public class ElectoralDistrictController {

    private final ElectoralDistrictMapper mapper;

    public ElectoralDistrictController(ElectoralDistrictMapper electoralDistrictMapper) {
        this.mapper = electoralDistrictMapper;
    }

    @GetMapping
    public List<ElectoralDistrict> findAll() {
        return mapper.findAll();
    }
    @PostMapping
    public ElectoralDistrict save(@RequestBody ElectoralDistrictDto dto) {
        return mapper.save(dto);
    }

    @GetMapping("/{id}")
    public ElectoralDistrictDto findById(@PathVariable Long id) {
        return mapper.findById(id);
    }

    @DeleteMapping("/{id}")
    public ElectoralDistrictDto delete(@PathVariable Long id) {
        return mapper.delete(id);
    }
}
