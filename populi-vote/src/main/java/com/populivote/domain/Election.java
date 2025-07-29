package com.populivote.domain;

import com.populivote.enums.ElectionStatus;
import com.populivote.enums.ElectionType;
import com.populivote.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.time.LocalDateTime;
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
public class Election extends BaseEntity {

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private ElectionType type;

    @Column(name = "status")
    @Enumerated(EnumType.ORDINAL)
    private ElectionStatus status;

    public Election(String title, String description, LocalDateTime startDate, LocalDateTime endDate, ElectionStatus electionStatus, ElectionType type) {
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = electionStatus;
        this.type = type;
    }
}
