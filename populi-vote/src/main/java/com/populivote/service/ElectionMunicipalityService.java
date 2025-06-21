package com.populivote.service;

import com.populivote.domain.Election;
import com.populivote.domain.ElectionMunicipality;
import com.populivote.repository.ElectionMunicipalityRepository;
import java.util.List;
import java.util.stream.*;
import org.springframework.stereotype.Service;

@Service
public class ElectionMunicipalityService {
    private final ElectionMunicipalityRepository electionMunicipalityRepository;

    public ElectionMunicipalityService(ElectionMunicipalityRepository electionMunicipalityRepository) {
        this.electionMunicipalityRepository = electionMunicipalityRepository;
    }

    public List<Long> findMunicipalityIdsByElection(Election election) {
        return electionMunicipalityRepository.findAllByElection(election)
            .stream()
            .map(em -> em.getMunicipality().getId())
            .collect(Collectors.toList());
    }

    public List<ElectionMunicipality> saveAll(List<ElectionMunicipality> electionMunicipalities) {
        return this.electionMunicipalityRepository.saveAll(electionMunicipalities);
    }
}
