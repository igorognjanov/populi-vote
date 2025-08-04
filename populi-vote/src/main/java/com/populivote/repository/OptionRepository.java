package com.populivote.repository;

import com.populivote.domain.Election;
import com.populivote.domain.Option;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OptionRepository extends JpaRepository<Option, Long> {
    @Query("""
            select o from Option o
            left join o.electionElectoralDistrict eed
            left join o.electionMunicipality em
            where o.election.id = :electionId
               or eed.election.id = :electionId
               or em.election.id = :electionId
        """)
    List<Option> findAllByElectionId(Long electionId);
}
