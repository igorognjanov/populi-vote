package com.populivote.service;

import com.populivote.domain.Election;
import com.populivote.domain.Option;
import com.populivote.domain.PollingStation;
import com.populivote.domain.Vote;
import com.populivote.repository.VoteRepository;
import org.springframework.stereotype.Service;

@Service
public class VoteService {

    private final VoteRepository voteRepository;

    public VoteService(VoteRepository voteRepository) {
        this.voteRepository = voteRepository;
    }

    public Vote create(Option option, PollingStation pollingStation, String voter) {
        return voteRepository.save(new Vote(option, pollingStation, voter));
    }

    public Boolean hasUserVotedOnElection(String user, Election election) {
        return voteRepository.existsByOption_ElectionAndVoter(election, user);
    }


}
