package com.personr.children.repository;

import com.personr.children.domain.Daughter;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Daughter entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DaughterRepository extends JpaRepository<Daughter, Long> {

}
