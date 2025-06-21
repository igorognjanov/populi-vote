package com.populivote.service;

import com.populivote.domain.Election;
import com.populivote.domain.ElectionElectoralDistrict;
import com.populivote.repository.ElectionElectoralDistrictRepository;
import java.util.List;
import java.util.stream.*;
import org.springframework.stereotype.Service;

@Service
public class ElectionElectoralDistrictService {

    private final ElectionElectoralDistrictRepository electionElectoralDistrictRepository;

    private ElectionElectoralDistrictService(ElectionElectoralDistrictRepository electionElectoralDistrictRepository) {
        this.electionElectoralDistrictRepository = electionElectoralDistrictRepository;
    }

    public List<Long> findElectoralDistrictIdsByElection(Election election) {
        return electionElectoralDistrictRepository.findAllByElection(election)
            .stream()
            .map(eed -> eed.getElectoralDistrict().getId())
            .collect(
                Collectors.toList());
    }

    public List<ElectionElectoralDistrict> saveAll(List<ElectionElectoralDistrict> electionElectoralDistricts) {
        return this.electionElectoralDistrictRepository.saveAll(electionElectoralDistricts);
    }
}
