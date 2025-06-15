package com.populivote.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class PollingStationRequest {

    private String name;

    private Long municipalityId;

    private String address;
}
