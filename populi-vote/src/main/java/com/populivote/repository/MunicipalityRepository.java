package com.populivote.repository;

import com.populivote.domain.Municipality;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MunicipalityRepository extends JpaRepository<Municipality, Long> {

    List<Municipality> findAllByDeletedOrderByCreatedDateDesc(Boolean deleted);

}
