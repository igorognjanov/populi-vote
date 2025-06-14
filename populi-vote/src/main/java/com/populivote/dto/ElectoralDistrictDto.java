package com.populivote.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ElectoralDistrictDto {

    private Long id;
    private String name;
    private String code;
    private String description;
}
