package com.populivote.service;

import com.populivote.domain.Election;
import com.populivote.domain.Option;
import com.populivote.repository.OptionRepository;
import com.populivote.request.OptionRequest;
import java.util.List;
import java.util.Objects;
import java.util.stream.*;
import org.springframework.stereotype.Service;

@Service
public class OptionService {

    private final PollingStationService pollingStationService;
    private final AuthenticationService authenticationService;
    private final OptionRepository optionRepository;

    public OptionService(PollingStationService pollingStationService, AuthenticationService authenticationService,
                         OptionRepository optionRepository) {

        this.pollingStationService = pollingStationService;
        this.authenticationService = authenticationService;
        this.optionRepository = optionRepository;
    }

    public List<Option> getOptionsByElectionId(Election election, Boolean optionsForActiveUser) {
        var pollingStation = pollingStationService.fundByCode(authenticationService.getPollingStationCodeFromToken());
        if (optionsForActiveUser) {
            return optionRepository.findAllByElectionId(election.getId())
                .stream()
                .filter(it -> (it.getElectionMunicipality() == null && it.getElectionElectoralDistrict() == null)
                    ||
                    (it.getElectionMunicipality() != null &&
                        it.getElectionMunicipality().getMunicipality() != null &&
                        Objects.equals(it.getElectionMunicipality().getMunicipality().getId(),
                            pollingStation.getMunicipality().getId())) ||
                    (it.getElectionElectoralDistrict() != null &&
                        it.getElectionElectoralDistrict().getElectoralDistrict() != null &&
                        Objects.equals(it.getElectionElectoralDistrict().getElectoralDistrict().getId(),
                            pollingStation.getMunicipality().getElectoralDistrict().getId())))
                .collect(Collectors.toList());
        } else {
            return optionRepository.findAllByElectionId(election.getId());
        }
    }

    public void updateOptions(List<OptionRequest> optionRequests) {
        var options = optionRepository.findAllById(optionRequests.stream().map(OptionRequest::getOptionId).collect(
            Collectors.toList()));

        optionRepository.saveAll(options.stream().map(it -> {
            var copy = copyOption(it);
            copy.setNumberOfPhysicalVotes(optionRequests.stream()
                .filter(optionRequest -> Objects.equals(optionRequest.getOptionId(), copy.getId()))
                .findFirst().get().getNumberOfPhysicalVotes());
            return copy;
        }).collect(Collectors.toList()));
    }

    private Option copyOption(Option option) {
        var newOption = new Option(
            option.getTitle(),
            option.getElectionElectoralDistrict(),
            option.getElectionMunicipality(),
            option.getElection(),
            option.getNumberOfPhysicalVotes()
        );

        newOption.setId(option.getId());
        return newOption;
    }
}
