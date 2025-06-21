package com.populivote.repository;

import com.populivote.domain.Election;
import com.populivote.domain.ElectionMunicipality;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElectionMunicipalityRepository extends JpaRepository<ElectionMunicipality, Long> {

    List<ElectionMunicipality> findAllByElection(Election election);
}
