package com.populivote.repository;

import com.populivote.domain.PollingStation;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PollingStationRepository extends JpaRepository<PollingStation, Long> {
    List<PollingStation> findAllByDeletedOrderByCreatedDateDesc(Boolean deleted);
}
