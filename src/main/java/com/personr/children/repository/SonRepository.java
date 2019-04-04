package com.personr.children.repository;

import com.personr.children.domain.Son;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Son entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SonRepository extends JpaRepository<Son, Long> {

}
