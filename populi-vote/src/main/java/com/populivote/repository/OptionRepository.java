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
""")    //@Query("""
    //    select o from Option o where (o.election is not null and o.election.id = :electionId) or (o.electionElectoralDistrict is not null and o.electionElectoralDistrict.election.id = :electionId) or (o.electionMunicipality is not null and o.electionMunicipality.election.id = :electionId)
    //    """)
    List<Option> findAllByElectionId(Long electionId);
}
