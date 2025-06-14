package com.populivote.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MunicipalityRequest {
    private String name;
    private Long electoralDistrictId;
}
