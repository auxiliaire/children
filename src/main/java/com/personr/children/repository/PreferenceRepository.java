package com.personr.children.repository;

import com.personr.children.domain.Preference;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Preference entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PreferenceRepository extends JpaRepository<Preference, Long> {

}
