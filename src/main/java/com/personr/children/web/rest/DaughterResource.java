package com.personr.children.web.rest;
import com.personr.children.domain.Daughter;
import com.personr.children.repository.DaughterRepository;
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
 * REST controller for managing Daughter.
 */
@RestController
@RequestMapping("/api")
public class DaughterResource {

    private final Logger log = LoggerFactory.getLogger(DaughterResource.class);

    private static final String ENTITY_NAME = "daughter";

    private final DaughterRepository daughterRepository;

    public DaughterResource(DaughterRepository daughterRepository) {
        this.daughterRepository = daughterRepository;
    }

    /**
     * POST  /daughters : Create a new daughter.
     *
     * @param daughter the daughter to create
     * @return the ResponseEntity with status 201 (Created) and with body the new daughter, or with status 400 (Bad Request) if the daughter has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/daughters")
    public ResponseEntity<Daughter> createDaughter(@Valid @RequestBody Daughter daughter) throws URISyntaxException {
        log.debug("REST request to save Daughter : {}", daughter);
        if (daughter.getId() != null) {
            throw new BadRequestAlertException("A new daughter cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Daughter result = daughterRepository.save(daughter);
        return ResponseEntity.created(new URI("/api/daughters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /daughters : Updates an existing daughter.
     *
     * @param daughter the daughter to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated daughter,
     * or with status 400 (Bad Request) if the daughter is not valid,
     * or with status 500 (Internal Server Error) if the daughter couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/daughters")
    public ResponseEntity<Daughter> updateDaughter(@Valid @RequestBody Daughter daughter) throws URISyntaxException {
        log.debug("REST request to update Daughter : {}", daughter);
        if (daughter.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Daughter result = daughterRepository.save(daughter);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, daughter.getId().toString()))
            .body(result);
    }

    /**
     * GET  /daughters : get all the daughters.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of daughters in body
     */
    @GetMapping("/daughters")
    public List<Daughter> getAllDaughters() {
        log.debug("REST request to get all Daughters");
        return daughterRepository.findAll();
    }

    /**
     * GET  /daughters/:id : get the "id" daughter.
     *
     * @param id the id of the daughter to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the daughter, or with status 404 (Not Found)
     */
    @GetMapping("/daughters/{id}")
    public ResponseEntity<Daughter> getDaughter(@PathVariable Long id) {
        log.debug("REST request to get Daughter : {}", id);
        Optional<Daughter> daughter = daughterRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(daughter);
    }

    /**
     * DELETE  /daughters/:id : delete the "id" daughter.
     *
     * @param id the id of the daughter to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/daughters/{id}")
    public ResponseEntity<Void> deleteDaughter(@PathVariable Long id) {
        log.debug("REST request to delete Daughter : {}", id);
        daughterRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
