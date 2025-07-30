package com.populivote.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ElectionDto {

    private Long id;

    private String title;

    private String description;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private Integer type;

    private List<OptionDto> options;

    private List<Long> municipalityIds;

    private List<Long> electoralDistrictIds;

    private Boolean submitted;

    private List<OptionCandidates> optionCandidates;

    private String question;

}