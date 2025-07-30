package com.populivote.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OptionRequest {
    private Long optionId;
    private Long numberOfPhysicalVotes;
}
