package com.populivote.response;

import com.populivote.dto.OptionDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OptionStatsResponse {

    private OptionDto option;

    private Long totalVotes;

}
