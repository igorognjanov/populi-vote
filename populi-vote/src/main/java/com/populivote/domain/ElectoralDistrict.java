package com.populivote.domain;

import com.populivote.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
public final class ElectoralDistrict extends BaseEntity {

    @Column(name = "name")
    private String name;


    @Column(name = "deleted")
    private Boolean deleted;

}
