package com.populivote.service;

import com.populivote.domain.PollingStation;
import com.populivote.mapper.MunicipalityMapper;
import com.populivote.repository.PollingStationRepository;
import com.populivote.request.PollingStationRequest;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PollingStationService {

    private final PollingStationRepository pollingStationRepository;
    private final MunicipalityService municipalityService;

    public PollingStationService(
        PollingStationRepository pollingStationRepository,
        MunicipalityService municipalityService,
        MunicipalityMapper municipalityMapper
    ) {
        this.pollingStationRepository = pollingStationRepository;
        this.municipalityService = municipalityService;
    }

    public PollingStation save(PollingStationRequest request) {
        return this.pollingStationRepository.save(
            new PollingStation(request.getName(), municipalityService.findById(request.getMunicipalityId()),
                request.getAddress(), false));
    }

    public List<PollingStation> findAll() {
        return pollingStationRepository.findAllByDeletedOrderByCreatedDateDesc(false);
    }

    public PollingStation findById(Long id) {
        return pollingStationRepository.findById(id).orElseThrow();
    }

    public PollingStation delete(Long id) {
        var pollingStation = findById(id);
        pollingStation.setDeleted(true);
        return pollingStationRepository.save(pollingStation);
    }
}
