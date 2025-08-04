package com.populivote.service;

import com.populivote.mapper.ElectionMapper;
import com.populivote.response.OptionStatsResponse;
import java.util.List;
import java.util.stream.*;
import org.springframework.stereotype.Service;

@Service
public class ElectionStatsService {

    private final OptionService optionService;
    private final StatsService statsService;
    private final ElectionService electionService;
    private final ElectionMapper electionMapper;

    public ElectionStatsService(OptionService optionService, StatsService statsService, ElectionService electionService,
                                ElectionMapper electionMapper) {

        this.optionService = optionService;
        this.statsService = statsService;
        this.electionService = electionService;
        this.electionMapper = electionMapper;
    }

    public List<OptionStatsResponse> getOptionStatsForElectionId(Long electionId) {
        return optionService.getOptionsByElectionId(electionService.findById(electionId), false).stream().map(
            option -> new OptionStatsResponse(electionMapper.mapOptionToOptionDto(option),
                statsService.getTotalVotesForOption(option))
        ).collect(Collectors.toList());
    }
}
