package com.personr.children.web.rest;
import com.personr.children.domain.House;
import com.personr.children.repository.HouseRepository;
import com.personr.children.web.rest.errors.BadRequestAlertException;
import com.personr.children.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing House.
 */
@RestController
@RequestMapping("/api")
public class HouseResource {

    private final Logger log = LoggerFactory.getLogger(HouseResource.class);

    private static final String ENTITY_NAME = "house";

    private final HouseRepository houseRepository;

    public HouseResource(HouseRepository houseRepository) {
        this.houseRepository = houseRepository;
    }

    /**
     * POST  /houses : Create a new house.
     *
     * @param house the house to create
     * @return the ResponseEntity with status 201 (Created) and with body the new house, or with status 400 (Bad Request) if the house has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/houses")
    public ResponseEntity<House> createHouse(@Valid @RequestBody House house) throws URISyntaxException {
        log.debug("REST request to save House : {}", house);
        if (house.getId() != null) {
            throw new BadRequestAlertException("A new house cannot already have an ID", ENTITY_NAME, "idexists");
        }
        House result = houseRepository.save(house);
        return ResponseEntity.created(new URI("/api/houses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /houses : Updates an existing house.
     *
     * @param house the house to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated house,
     * or with status 400 (Bad Request) if the house is not valid,
     * or with status 500 (Internal Server Error) if the house couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/houses")
    public ResponseEntity<House> updateHouse(@Valid @RequestBody House house) throws URISyntaxException {
        log.debug("REST request to update House : {}", house);
        if (house.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        House result = houseRepository.save(house);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, house.getId().toString()))
            .body(result);
    }

    /**
     * GET  /houses : get all the houses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of houses in body
     */
    @GetMapping("/houses")
    public List<House> getAllHouses() {
        log.debug("REST request to get all Houses");
        return houseRepository.findAll();
    }

    /**
     * GET  /houses/:id : get the "id" house.
     *
     * @param id the id of the house to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the house, or with status 404 (Not Found)
     */
    @GetMapping("/houses/{id}")
    public ResponseEntity<House> getHouse(@PathVariable Long id) {
        log.debug("REST request to get House : {}", id);
        Optional<House> house = houseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(house);
    }

    /**
     * GET  /houses/:id : get the house by person "id".
     *
     * @param id the id of the person who owns the house to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the house, or with status 404 (Not Found)
     */
    @GetMapping("/house/{id}")
    public ResponseEntity<House> getHouseByPerson(@PathVariable Long id) {
        log.debug("REST request to get House : {}", id);
        Optional<House> house = houseRepository.findOneByPersonId(id);
        return ResponseUtil.wrapOrNotFound(house);
    }

    /**
     * DELETE  /houses/:id : delete the "id" house.
     *
     * @param id the id of the house to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/houses/{id}")
    public ResponseEntity<Void> deleteHouse(@PathVariable Long id) {
        log.debug("REST request to delete House : {}", id);
        houseRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
