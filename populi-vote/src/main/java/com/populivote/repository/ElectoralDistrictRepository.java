package com.populivote.repository;

import com.populivote.domain.ElectoralDistrict;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElectoralDistrictRepository extends JpaRepository<ElectoralDistrict, Long> {

    List<ElectoralDistrict> findAllByDeletedOrderByCreatedDateDesc(Boolean deleted);
}
