package com.populivote.service;

import com.populivote.domain.Municipality;
import com.populivote.request.MunicipalityRequest;
import com.populivote.repository.MunicipalityRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class MunicipalityService {

    private final MunicipalityRepository municipalityRepository;
    private final ElectoralDistrictService electoralDistrictService;

    public MunicipalityService(
        MunicipalityRepository municipalityRepository,
        ElectoralDistrictService electoralDistrictService
    ) {
        this.municipalityRepository = municipalityRepository;
        this.electoralDistrictService = electoralDistrictService;
    }

    public Municipality save(MunicipalityRequest dto) {
        return municipalityRepository.save(
            new Municipality(
                dto.getName(),
                electoralDistrictService.findById(dto.getElectoralDistrictId()),
                false)
        );
    }

    public List<Municipality> findAll() {
        return municipalityRepository.findAllByDeletedOrderByCreatedDateDesc(false);
    }

    public Municipality findById(Long id) {
        return municipalityRepository.findById(id).orElseThrow();
    }

    public Municipality delete(Long id) {
        var municipality = findById(id);
        municipality.setDeleted(true);
        return municipalityRepository.save(municipality);
    }
}
