package com.populivote.repository;

import com.populivote.domain.Election;
import com.populivote.domain.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    Boolean existsByOption_ElectionAndVoter(Election election, String voter);
}
