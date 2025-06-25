package com.populivote.enums;

import lombok.Getter;

@Getter
public enum ElectionType {
    PRESIDENTIAL("Presidential"),
    PARLIAMENTARY("Parliamentary"),
    MAYORAL("Mayoral"),
    //MUNICIPAL_COUNCIL("Municipal Council"),
    REFERENDUM("Referendum");

    private final String label;

    ElectionType(String label) {
        this.label = label;
    }
}
