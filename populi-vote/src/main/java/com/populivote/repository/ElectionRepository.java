package com.populivote.repository;

import com.populivote.domain.Election;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElectionRepository extends JpaRepository<Election, Long> {

    List<Election> findAllByDeletedOrderByCreatedDateDesc(Boolean deleted);

}
