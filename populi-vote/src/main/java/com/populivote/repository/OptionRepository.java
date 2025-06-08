package com.populivote.repository;

import com.populivote.domain.Election;
import com.populivote.domain.Option;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OptionRepository extends JpaRepository<Option, Long> {

    List<Option> findAllByElection(Election election);
}
