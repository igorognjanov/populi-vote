package com.populivote.mapper;

import com.populivote.domain.PollingStation;
import com.populivote.request.PollingStationRequest;
import com.populivote.response.PollingStationResponse;
import com.populivote.service.PollingStationService;
import java.util.List;
import java.util.stream.*;
import org.springframework.stereotype.Service;

@Service
public class PollingStationMapper {

    private final PollingStationService pollingStationService;
    private final MunicipalityMapper municipalityMapper;

    public PollingStationMapper(PollingStationService pollingStationService,
                                MunicipalityMapper municipalityMapper) {
        this.pollingStationService = pollingStationService;
        this.municipalityMapper = municipalityMapper;
    }

    public PollingStationResponse save(PollingStationRequest request) {
        return mapPollingStationToResponse(pollingStationService.save(request));
    }

    public PollingStationResponse findById(Long id) {
        return mapPollingStationToResponse(pollingStationService.findById(id));
    }

    public List<PollingStationResponse> findAll() {
        return pollingStationService.findAll()
            .stream()
            .map(this::mapPollingStationToResponse)
            .collect(Collectors.toList());
    }

    public PollingStationResponse delete(Long id) {
        return mapPollingStationToResponse(pollingStationService.delete(id));
    }

    private PollingStationResponse mapPollingStationToResponse(PollingStation pollingStation) {
        return new PollingStationResponse(pollingStation.getId(), pollingStation.getName(),
            municipalityMapper.mapMunicipalityToOptionResponse(pollingStation.getMunicipality()),
            pollingStation.getAddress());
    }
}
