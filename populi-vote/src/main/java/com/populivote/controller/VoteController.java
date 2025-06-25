package com.populivote.controller;

import com.populivote.domain.Vote;
import com.populivote.dto.VoteDto;
import com.populivote.mapper.VoteMapper;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/vote")
public class VoteController {

    private final VoteMapper voteMapper;

    public VoteController(VoteMapper voteMapper) {
        this.voteMapper = voteMapper;
    }

    @PostMapping("/{optionId}")
    public Vote create(@PathVariable Long optionId, Authentication connectedUser) {
        return voteMapper.create(optionId, connectedUser);
    }

    @PostMapping("/has-voted/{electionId}")
    public Boolean hasUserVotedOnElection(@PathVariable Long electionId, Authentication connectedUser) {
        return voteMapper.hasUserVotedOnElection(connectedUser, electionId);
    }
}
