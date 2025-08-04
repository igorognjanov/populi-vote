package com.populivote.repository;

import com.populivote.domain.Option;
import com.populivote.domain.Stats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatsRepository extends JpaRepository<Stats, Long> {

    Stats findByOption(Option option);

}
