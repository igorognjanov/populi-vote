package com.populivote.mapper;

import com.populivote.domain.ElectoralDistrict;
import com.populivote.dto.ElectoralDistrictDto;
import com.populivote.service.ElectoralDistrictService;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ElectoralDistrictMapper {

    private final ElectoralDistrictService electoralDistrictService;

    public ElectoralDistrictMapper(ElectoralDistrictService electoralDistrictService) {
        this.electoralDistrictService = electoralDistrictService;
    }

    public List<ElectoralDistrict> findAll() {
        return electoralDistrictService.findAll();
    }

    public ElectoralDistrict save(ElectoralDistrictDto dto) {
        return electoralDistrictService.save(dto);
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
}
