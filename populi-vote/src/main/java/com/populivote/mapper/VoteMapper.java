package com.populivote.mapper;

import com.populivote.domain.Vote;
import com.populivote.repository.OptionRepository;
import com.populivote.service.AuthenticationService;
import com.populivote.service.ElectionService;
import com.populivote.service.PollingStationService;
import com.populivote.service.VoteService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class VoteMapper {

    private final VoteService voteService;
    private final OptionRepository optionRepository;
    private final ElectionService electionService;
    private final AuthenticationService authenticationService;
    private final PollingStationService pollingStationService;

    public VoteMapper(VoteService voteService,
                      OptionRepository optionRepository,
                      ElectionService electionService,
                      AuthenticationService authenticationService,
                      PollingStationService pollingStationService) {
        this.voteService = voteService;
        this.optionRepository = optionRepository;
        this.electionService = electionService;
        this.authenticationService = authenticationService;
        this.pollingStationService = pollingStationService;
    }

    public Vote create(Long optionId, Authentication user) {
        return voteService.create(optionRepository.findById(optionId).orElseThrow(),
            pollingStationService.findByCode(authenticationService.getPollingStationCodeFromToken()), user.getName());
    }

    public Boolean hasUserVotedOnElection(Authentication user, Long electionId) {
        return voteService.hasUserVotedOnElection(user.getName(), electionService.findById(electionId));
    }
}
