package com.populivote.response;

import com.populivote.common.OptionResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MunicipalityResponse {
    private String name;
    private OptionResponse electoralDistrict;
}
