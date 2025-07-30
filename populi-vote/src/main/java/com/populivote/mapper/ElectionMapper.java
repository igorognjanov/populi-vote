package com.populivote.mapper;

import com.populivote.domain.Candidate;
import com.populivote.domain.Option;
import com.populivote.dto.CandidateDto;
import com.populivote.dto.OptionDto;
import com.populivote.enums.ElectionStatus;
import com.populivote.enums.ElectionType;
import com.populivote.common.OptionResponse;
import com.populivote.domain.Election;
import com.populivote.dto.ElectionDto;
import com.populivote.response.OngoingElectionResponse;
import com.populivote.service.ElectionElectoralDistrictService;
import com.populivote.service.ElectionMunicipalityService;
import com.populivote.service.ElectionService;
import com.populivote.service.OptionService;
import com.populivote.service.VoteService;
import java.util.Arrays;
import java.util.List;
import java.util.stream.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class ElectionMapper {

    private final ElectionService electionService;
    private final ElectionMunicipalityService electionMunicipalityService;
    private final ElectionElectoralDistrictService electionElectoralDistrictService;
    private final VoteService voteService;
    private final OptionService optionService;

    public ElectionMapper(ElectionService electionService,
                          ElectionMunicipalityService electionMunicipalityService,
                          ElectionElectoralDistrictService electionElectoralDistrictService,
                          VoteService voteService,
                          OptionService optionService) {
        this.electionService = electionService;
        this.electionMunicipalityService = electionMunicipalityService;
        this.electionElectoralDistrictService = electionElectoralDistrictService;
        this.voteService = voteService;
        this.optionService = optionService;
    }

    public List<ElectionDto> getElections() {
        return electionService.getElections()
            .stream()
            .map(this::mapElectionToResponse)
            .collect(Collectors.toList());
    }

    public List<OngoingElectionResponse> getOngoingElections(Authentication connectedUser) {
        return electionService.getOngoingElections()
            .stream()
            .map(election -> mapElectionToOngoingElectionResponse(election, connectedUser))
            .collect(Collectors.toList());
    }

    public ElectionDto findById(Long id) {
        return mapElectionToResponseWithOptions(electionService.findById(id), false);
    }

    public ElectionDto findByIdForVote(Long id) {
        return mapElectionToResponseWithOptions(electionService.findById(id), true);
    }

    public ElectionDto createOrUpdate(ElectionDto request, Authentication connectedUser) {
        return mapElectionToResponseWithOptions(electionService.createOrUpdate(request), false);
    }

    public void softDelete(Long id) {
        electionService.softDelete(id);
    }

    public List<OptionResponse> getElectionTypes() {
        return Arrays.stream(ElectionType.values())
            .map(it -> new OptionResponse(it.getLabel(), it.name(), (long) it.ordinal()))
            .collect(Collectors.toList());
    }

    private ElectionDto mapElectionToResponse(Election election) {
        return new ElectionDto(election.getId(), election.getTitle(), election.getDescription(),
            election.getStartDate(),
            election.getEndDate(),
            election.getType().ordinal(),
            null,
            electionMunicipalityService.findMunicipalityIdsByElection(election),
            electionElectoralDistrictService.findElectoralDistrictIdsByElection(election),
            election.getStatus() == ElectionStatus.SUBMITTED,
            null,
            election.getQuestion()
        );
    }

    private OngoingElectionResponse mapElectionToOngoingElectionResponse(Election election,
                                                                         Authentication connectedUser) {
        return new OngoingElectionResponse(election.getId(), election.getTitle(), election.getDescription(),
            election.getStartDate(),
            election.getEndDate(),
            election.getType().getLabel(),
            voteService.hasUserVotedOnElection(connectedUser.getName(), election)
        );
    }

    private ElectionDto mapElectionToResponseWithOptions(Election election, Boolean optionsForActiveUser) {
        return new ElectionDto(election.getId(), election.getTitle(), election.getDescription(),
            election.getStartDate(),
            election.getEndDate(),
            election.getType().ordinal(),
            optionService.getOptionsByElectionId(election, optionsForActiveUser)
                .stream().map(this::mapOptionToOptionDto).collect(Collectors.toList()),
            electionMunicipalityService.findMunicipalityIdsByElection(election),
            electionElectoralDistrictService.findElectoralDistrictIdsByElection(election),
            election.getStatus() == ElectionStatus.SUBMITTED,
            null,
            election.getQuestion()
        );
    }

    private OptionDto mapOptionToOptionDto(Option option) {
        Long municipalityId = null;
        Long electoralDistrictId = null;
        if (option.getElectionMunicipality() != null) {
            municipalityId = option.getElectionMunicipality().getMunicipality().getId();
        }
        if (option.getElectionElectoralDistrict() != null) {
            electoralDistrictId = option.getElectionElectoralDistrict().getElectoralDistrict().getId();
        }

        return new OptionDto(option.getId(), option.getTitle(), municipalityId,
            electoralDistrictId,
            mapCandidatesToCandidateDtos(electionService.getCandidates(option)),
            option.getNumberOfPhysicalVotes());
    }

    private List<CandidateDto> mapCandidatesToCandidateDtos(List<Candidate> candidates) {
        return candidates.stream()
            .map(it -> new CandidateDto(it.getName(), it.getPosition()))
            .collect(Collectors.toList());
    }
}
