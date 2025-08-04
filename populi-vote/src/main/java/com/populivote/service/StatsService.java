package com.populivote.service;

import com.populivote.domain.Option;
import com.populivote.domain.Stats;
import com.populivote.repository.StatsRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class StatsService {

    private final StatsRepository repository;
    private final VoteService voteService;
    private final ElectionService electionService;
    private final OptionService optionService;

    public StatsService(StatsRepository repository, VoteService voteService, ElectionService electionService,
                        OptionService optionService) {
        this.repository = repository;
        this.voteService = voteService;
        this.electionService = electionService;
        this.optionService = optionService;
    }

    @Scheduled(fixedDelay = 10_000)
    private void updateStats() {
        // TODO: optimize this to use just one db call for all election options
        electionService.getElections().forEach(
            election -> optionService.getOptionsByElectionId(election, false)
                .forEach(this::createOrUpdateStatsForOption)
        );
    }

    private void createOrUpdateStatsForOption(Option option) {
        var stats = repository.findByOption(option);
        var count = voteService.countVotesForOption(option);
        if (option.getNumberOfPhysicalVotes() != null) {
            count += option.getNumberOfPhysicalVotes();
        }

        if (stats != null && !stats.getTotalVotes().equals(count)) {
            stats.setTotalVotes(count);
            repository.save(stats);
        } else if (stats == null) {
            var newStats = new Stats(option, count);
            newStats.setCreatedBy("");
            repository.save(newStats);
        }
    }

    public Long getTotalVotesForOption(Option option) {
        var stats = repository.findByOption(option);
        if (stats != null) {
            return stats.getTotalVotes();
        } else {
            return 0L;
        }
    }
}
