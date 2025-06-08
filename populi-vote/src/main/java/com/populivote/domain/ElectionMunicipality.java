package com.populivote.domain;

import com.populivote.common.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Setter
@Getter
@Entity
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ElectionMunicipality extends BaseEntity {

    @JoinColumn(name = "election_id")
    @ManyToOne
    private Election election;

    @JoinColumn(name = "municipality_id")
    @ManyToOne
    private Municipality municipality;
}
