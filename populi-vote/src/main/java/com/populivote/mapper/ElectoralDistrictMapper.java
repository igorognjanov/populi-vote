package com.populivote.mapper;

import com.populivote.common.OptionResponse;
import com.populivote.domain.ElectoralDistrict;
import com.populivote.dto.ElectoralDistrictDto;
import com.populivote.service.ElectoralDistrictService;
import java.util.List;
import java.util.stream.*;
import org.springframework.stereotype.Service;

@Service
public class ElectoralDistrictMapper {

    private final ElectoralDistrictService electoralDistrictService;

    public ElectoralDistrictMapper(ElectoralDistrictService electoralDistrictService) {
        this.electoralDistrictService = electoralDistrictService;
    }

    public List<ElectoralDistrictDto> findAll() {
        return electoralDistrictService.findAll()
            .stream()
            .map(this::mapElectoralDistrictToDto)
            .collect(Collectors.toList());
    }

    public List<OptionResponse> findAllAsOptions() {
        return electoralDistrictService.findAll()
            .stream()
            .map(this::mapElectoralDistrictToOptionResponse)
            .collect(Collectors.toList());
    }

    public ElectoralDistrictDto save(ElectoralDistrictDto dto) {
        return mapElectoralDistrictToDto(electoralDistrictService.save(dto));
    }

    public ElectoralDistrictDto findById(Long id) {
        return mapElectoralDistrictToDto(electoralDistrictService.findById(id));
    }

    public ElectoralDistrictDto delete(Long id) {
        return mapElectoralDistrictToDto(electoralDistrictService.delete(id));
    }

    private ElectoralDistrictDto mapElectoralDistrictToDto(ElectoralDistrict electoralDistrict) {
        return new ElectoralDistrictDto(electoralDistrict.getId(), electoralDistrict.getName(),
            electoralDistrict.getCode(), electoralDistrict.getDescription());
    }

    public OptionResponse mapElectoralDistrictToOptionResponse(ElectoralDistrict electoralDistrict) {
        return new OptionResponse(electoralDistrict.getName(), electoralDistrict.getCode(), electoralDistrict.getId());
    }
}
