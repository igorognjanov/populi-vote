package com.populivote.mapper;

import com.populivote.common.OptionResponse;
import com.populivote.domain.Municipality;
import com.populivote.request.MunicipalityRequest;
import com.populivote.response.MunicipalityResponse;
import com.populivote.service.MunicipalityService;
import java.util.List;
import java.util.stream.*;
import org.springframework.stereotype.Service;

@Service
public class MunicipalityMapper {

    private final MunicipalityService municipalityService;
    private final ElectoralDistrictMapper electoralDistrictMapper;

    public MunicipalityMapper(MunicipalityService municipalityService,
                              ElectoralDistrictMapper electoralDistrictMapper) {
        this.municipalityService = municipalityService;
        this.electoralDistrictMapper = electoralDistrictMapper;
    }

    public MunicipalityResponse save(MunicipalityRequest dto) {
        return mapMunicipalityToResponse(municipalityService.save(dto));
    }

    public List<MunicipalityResponse> findAll() {
        return municipalityService.findAll().stream().map(this::mapMunicipalityToResponse).collect(Collectors.toList());
    }

    public List<OptionResponse> findAllAsOptions() {
        return municipalityService.findAll()
            .stream()
            .map(this::mapMunicipalityToOptionResponse)
            .collect(Collectors.toList());
    }

    public MunicipalityResponse findById(Long id) {
        return mapMunicipalityToResponse(municipalityService.findById(id));
    }

    public MunicipalityResponse delete(Long id) {
        return mapMunicipalityToResponse(municipalityService.delete(id));
    }

    private MunicipalityResponse mapMunicipalityToResponse(Municipality municipality) {
        return new MunicipalityResponse(municipality.getId(), municipality.getName(),
            electoralDistrictMapper.mapElectoralDistrictToOptionResponse(municipality.getElectoralDistrict()));
    }

    public OptionResponse mapMunicipalityToOptionResponse(Municipality municipality) {
        return new OptionResponse(municipality.getName(), null, municipality.getId());
    }
}
