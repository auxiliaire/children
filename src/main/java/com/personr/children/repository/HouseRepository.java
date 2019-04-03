package com.personr.children.repository;

import com.personr.children.domain.House;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the House entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HouseRepository extends JpaRepository<House, Long> {

}
