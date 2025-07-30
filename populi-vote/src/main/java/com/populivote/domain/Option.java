package com.populivote.domain;

import com.populivote.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public final class Option extends BaseEntity {

    @Column(name = "title")
    private String title;

    @ManyToOne
    @JoinColumn(name = "election_electoral_dsitrict_id")
    private ElectionElectoralDistrict electionElectoralDistrict;

    @ManyToOne
    @JoinColumn(name = "election_municipality_id")
    private ElectionMunicipality electionMunicipality;

    @ManyToOne
    @JoinColumn(name = "election_id")
    private Election election;

    @Column(name = "number_of_physical_votes")
    private Long numberOfPhysicalVotes;
}
