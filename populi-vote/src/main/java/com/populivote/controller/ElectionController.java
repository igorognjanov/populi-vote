package com.populivote.controller;

import com.populivote.common.OptionResponse;
import com.populivote.dto.ElectionDto;
import com.populivote.mapper.ElectionMapper;
import com.populivote.response.OngoingElectionResponse;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/elections")
public class ElectionController {

    private final ElectionMapper electionMapper;

    public ElectionController(ElectionMapper electionMapper) {
        this.electionMapper = electionMapper;
    }

    @GetMapping
    public List<ElectionDto> getElections() {
        return electionMapper.getElections();
    }

    @GetMapping("/ongoing")
    public List<OngoingElectionResponse> getOngoingElections(Authentication connectedUser) {
        return electionMapper.getOngoingElections(connectedUser);
    }

    @GetMapping("/{id}")
    public ElectionDto findById(@PathVariable Long id) {
        return electionMapper.findById(id);
    }

    @PutMapping
    public ElectionDto createOrEdit(@RequestBody ElectionDto electionRequest, Authentication connectedUser
    ) {
        return electionMapper.createOrUpdate(electionRequest, connectedUser);
    }

    @DeleteMapping("/{id}")
    public void softDelete(@PathVariable Long id) {
        electionMapper.softDelete(id);
    }
    @GetMapping("/types")
    public List<OptionResponse> getElectionTypes() {
        return electionMapper.getElectionTypes();
    }
}
