package com.populivote.repository;

import com.populivote.domain.Candidate;
import com.populivote.domain.Option;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    List<Candidate> findAllByOption(Option option);

}
