package com.personr.children.repository;

import com.personr.children.domain.ParentSummary;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ParentSummary entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParentSummaryRepository extends JpaRepository<ParentSummary, Long> {

}
