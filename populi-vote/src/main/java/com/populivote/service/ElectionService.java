package com.populivote.service;

import com.populivote.domain.Candidate;
import com.populivote.domain.Election;
import com.populivote.domain.Option;
import com.populivote.dto.ElectionDto;
import com.populivote.enums.ElectionType;
import com.populivote.repository.CandidateRepository;
import com.populivote.repository.ElectionRepository;
import com.populivote.repository.OptionRepository;
import java.util.List;
import java.util.stream.*;
import org.springframework.stereotype.Service;

@Service
public class ElectionService {

    private final ElectionRepository electionRepository;
    private final OptionRepository optionRepository;
    private final CandidateRepository candidateRepository;

    public ElectionService(ElectionRepository electionRepository, OptionRepository optionRepository,
                           CandidateRepository candidateRepository) {
        this.electionRepository = electionRepository;
        this.optionRepository = optionRepository;
        this.candidateRepository = candidateRepository;
    }

    //TODO: Add logs

    public List<Election> getElections() {
        return electionRepository.findAllByDeletedOrderByCreatedDateDesc(false);
    }
    public List<Option> getOptions(Election election) {
        return optionRepository.findAllByElection(election);
    }

    public List<Candidate> getCandidates(Option option) {
        return candidateRepository.findAllByOption(option);
    }

    public Election findById(Long id) {
        return electionRepository.findById(id).orElseThrow();
    }

    public void softDelete(Long id) {
        var election = findById(id);
        election.setDeleted(true);
        electionRepository.save(election);
    }

    public Election createOrUpdate(ElectionDto request) {
        if (request.getId() == null) {
            var election = electionRepository.save(new Election(
                request.getDescription(),
                request.getTitle(),
                request.getStartDate(),
                request.getEndDate(),
                ElectionType.values()[request.getType()]
            ));

            request.getOptions().forEach(optionDto -> {
                var option = optionRepository.save(new Option(optionDto.getTitle(), election));

                candidateRepository.saveAll(optionDto.getCandidates()
                    .stream()
                    .map(candidateDto -> new Candidate(candidateDto.getName(), candidateDto.getPosition(), option,
                        false))
                    .collect(Collectors.toList()));
            });

            return election;

        } else {
            var election = findById(request.getId());
            election.setTitle(request.getTitle());
            election.setDescription(request.getDescription());
            election.setStartDate(request.getStartDate());
            election.setEndDate(request.getEndDate());
            return electionRepository.save(election);
        }
    }
}
