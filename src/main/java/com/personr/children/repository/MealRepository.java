package com.personr.children.repository;

import com.personr.children.domain.Meal;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Meal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {

}
