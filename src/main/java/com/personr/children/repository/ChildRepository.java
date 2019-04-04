package com.personr.children.repository;

import com.personr.children.domain.Child;
import com.personr.children.domain.Preference;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Child entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChildRepository extends JpaRepository<Child, Long> {

    @Query("SELECT p FROM Preference p WHERE p.child.id = :id AND p.weight = (SELECT max(p.weight) FROM Preference p WHERE p.child.id = :id)")
    Preference getFavorite(@Param("id") Long id);

}
