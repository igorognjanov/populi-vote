package com.populivote.mapper;

import com.populivote.domain.Candidate;
import com.populivote.domain.Option;
import com.populivote.dto.CandidateDto;
import com.populivote.dto.OptionDto;
import com.populivote.enums.ElectionType;
import com.populivote.common.OptionResponse;
import com.populivote.domain.Election;
import com.populivote.dto.ElectionDto;
import com.populivote.service.ElectionService;
import java.util.Arrays;
import java.util.List;
import java.util.stream.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class ElectionMapper {

    private final ElectionService electionService;

    public ElectionMapper(ElectionService electionService) {
        this.electionService = electionService;
    }

    public List<ElectionDto> getElections() {
        return electionService.getElections()
            .stream()
            .map(this::mapElectionToResponse)
            .collect(Collectors.toList());
    }

    public ElectionDto findById(Long id) {
        return mapElectionToResponse(electionService.findById(id));
    }

    public ElectionDto createOrUpdate(ElectionDto request, Authentication connectedUser) {
        return mapElectionToResponse(electionService.createOrUpdate(request));
    }

    public void softDelete(Long id) {
        electionService.softDelete(id);
    }

    public List<OptionResponse> getElectionTypes() {
        return Arrays.stream(ElectionType.values())
            .map(it -> new OptionResponse(it.getLabel(), it.name(), it.ordinal()))
            .collect(
                Collectors.toList());
    }

    private ElectionDto mapElectionToResponse(Election election) {
        return new ElectionDto(election.getId(), election.getTitle(), election.getDescription(),
            election.getStartDate(),
            election.getEndDate(),
            election.getType().ordinal(),
            electionService.getOptions(election)
                .stream().map(this::mapOptionToOptionDto).collect(Collectors.toList())
        );
    }

    private OptionDto mapOptionToOptionDto(Option option) {
        return new OptionDto(option.getTitle(), mapCandidatesToCandidateDtos(electionService.getCandidates(option)));
    }

    private List<CandidateDto> mapCandidatesToCandidateDtos(List<Candidate> candidates) {
        return candidates.stream()
            .map(it -> new CandidateDto(it.getName(), it.getPosition()))
            .collect(Collectors.toList());
    }
}
