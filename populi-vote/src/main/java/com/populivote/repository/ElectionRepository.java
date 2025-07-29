package com.populivote.repository;

import com.populivote.domain.Election;
import com.populivote.enums.ElectionStatus;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElectionRepository extends JpaRepository<Election, Long> {

    List<Election> findAllByStatusOrderByCreatedDateDesc(ElectionStatus status);

}
