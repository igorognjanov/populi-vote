package com.populivote.service;

import com.populivote.domain.ElectoralDistrict;
import com.populivote.dto.ElectoralDistrictDto;
import com.populivote.repository.ElectoralDistrictRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ElectoralDistrictService {

    private final ElectoralDistrictRepository electoralDistrictRepository;

    public ElectoralDistrictService(ElectoralDistrictRepository electoralDistrictRepository) {
        this.electoralDistrictRepository = electoralDistrictRepository;
    }

    public ElectoralDistrict save(ElectoralDistrictDto dto) {
        return electoralDistrictRepository.save(
            new ElectoralDistrict(dto.getName(), dto.getCode(), dto.getDescription(), false)
        );
    }

    public List<ElectoralDistrict> findAll() {
        return electoralDistrictRepository.findAllByDeletedOrderByCreatedDateDesc(false);
    }

    public ElectoralDistrict findById(Long id) {
        return electoralDistrictRepository.findById(id).orElseThrow();
    }

    public ElectoralDistrict delete(Long id) {
        ElectoralDistrict electoralDistrict = findById(id);
        electoralDistrict.setDeleted(true);
        electoralDistrictRepository.save(electoralDistrict);
        return electoralDistrict;
    }
}
