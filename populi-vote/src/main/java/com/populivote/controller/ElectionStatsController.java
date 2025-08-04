package com.populivote.controller;

import com.populivote.response.OptionStatsResponse;
import com.populivote.service.ElectionStatsService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/election-stats")
public class ElectionStatsController {

    private final ElectionStatsService electionStatsService;

    public ElectionStatsController(ElectionStatsService electionStatsService) {
        this.electionStatsService = electionStatsService;
    }

    @GetMapping("/{electionId}")
    public List<OptionStatsResponse> findAllOptionStatsByElectionId(@PathVariable Long electionId) {
        return electionStatsService.getOptionStatsForElectionId(electionId);
    }
}
