package com.populivote.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OptionCandidates {
    private Long municipalityId;
    private Long electoralDistrictId;
    private List<OptionDto> options;
}
