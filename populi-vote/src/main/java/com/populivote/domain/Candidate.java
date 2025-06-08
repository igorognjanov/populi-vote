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

@Setter
@Getter
@Entity
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Candidate extends BaseEntity {

    @Column(name = "name")
    private String name;

    @Column(name = "position")
    private Integer position;

    @ManyToOne
    @JoinColumn(name = "option_id")
    private Option option;

    @Column(name = "deleted")
    private Boolean deleted;
}
