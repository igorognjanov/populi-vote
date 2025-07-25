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
public class OptionDto {

    private Long id;

    private String title;

    private List<CandidateDto> candidates;
}
