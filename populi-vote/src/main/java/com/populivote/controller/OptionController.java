package com.populivote.controller;

import com.populivote.request.OptionRequest;
import com.populivote.service.OptionService;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/options")
public class OptionController {

    private final OptionService optionService;

    public OptionController(OptionService optionService) {
        this.optionService = optionService;
    }

    @PostMapping
    public void updateOptionPhysicalVotes(@RequestBody List<OptionRequest> optionRequests) {
        optionService.updateOptions(optionRequests);
    }
}
