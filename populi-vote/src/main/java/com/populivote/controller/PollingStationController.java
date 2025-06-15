package com.populivote.controller;

import com.populivote.mapper.PollingStationMapper;
import com.populivote.request.PollingStationRequest;
import com.populivote.response.PollingStationResponse;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/polling-station")
public class PollingStationController {

    private final PollingStationMapper pollingStationMapper;

    public PollingStationController(PollingStationMapper pollingStationMapper) {
        this.pollingStationMapper = pollingStationMapper;
    }

    @GetMapping
    public List<PollingStationResponse> findAll() {
        return pollingStationMapper.findAll();
    }

    @PostMapping
    public PollingStationResponse save(@RequestBody PollingStationRequest request) {
        return pollingStationMapper.save(request);
    }

    @GetMapping("/{id}")
    public PollingStationResponse findById(@PathVariable Long id) {
        return pollingStationMapper.findById(id);
    }

    @DeleteMapping("/{id}")
    public PollingStationResponse delete(@PathVariable Long id) {
        return pollingStationMapper.delete(id);
    }
}
