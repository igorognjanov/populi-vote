package com.populivote.controller;

import com.populivote.request.MunicipalityRequest;
import com.populivote.mapper.MunicipalityMapper;
import com.populivote.response.MunicipalityResponse;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/municipality")
public class MunicipalityController {

    private final MunicipalityMapper mapper;

    public MunicipalityController(MunicipalityMapper mapper) {
        this.mapper = mapper;
    }

    @PostMapping
    public MunicipalityResponse save(@RequestBody MunicipalityRequest dto) {
        return this.mapper.save(dto);
    }

    @GetMapping
    public List<MunicipalityResponse> findAll() {
        return this.mapper.findAll();
    }

    @GetMapping("/{id}")
    public MunicipalityResponse findById(@PathVariable Long id) {
        return mapper.findById(id);
    }

    @DeleteMapping("/{id}")
    public MunicipalityResponse delete(@PathVariable Long id) {
        return mapper.delete(id);
    }
}
