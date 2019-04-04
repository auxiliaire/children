package com.personr.children.repository;

import com.personr.children.domain.House;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the House entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HouseRepository extends JpaRepository<House, Long> {

    @Cacheable("com.personr.children.repository.HouseRepository.byPerson")
    Optional<House> findOneByPersonId(Long id);
}
