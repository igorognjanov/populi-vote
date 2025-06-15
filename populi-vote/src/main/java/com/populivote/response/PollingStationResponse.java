package com.populivote.response;

import com.populivote.common.OptionResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class PollingStationResponse {
    private Long id;
    private String name;
    private OptionResponse municipality;
    private String address;
}
