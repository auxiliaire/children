package com.personr.children.web.rest;
import com.personr.children.domain.Son;
import com.personr.children.repository.SonRepository;
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
 * REST controller for managing Son.
 */
@RestController
@RequestMapping("/api")
public class SonResource {

    private final Logger log = LoggerFactory.getLogger(SonResource.class);

    private static final String ENTITY_NAME = "son";

    private final SonRepository sonRepository;

    public SonResource(SonRepository sonRepository) {
        this.sonRepository = sonRepository;
    }

    /**
     * POST  /sons : Create a new son.
     *
     * @param son the son to create
     * @return the ResponseEntity with status 201 (Created) and with body the new son, or with status 400 (Bad Request) if the son has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sons")
    public ResponseEntity<Son> createSon(@Valid @RequestBody Son son) throws URISyntaxException {
        log.debug("REST request to save Son : {}", son);
        if (son.getId() != null) {
            throw new BadRequestAlertException("A new son cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Son result = sonRepository.save(son);
        return ResponseEntity.created(new URI("/api/sons/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sons : Updates an existing son.
     *
     * @param son the son to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated son,
     * or with status 400 (Bad Request) if the son is not valid,
     * or with status 500 (Internal Server Error) if the son couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sons")
    public ResponseEntity<Son> updateSon(@Valid @RequestBody Son son) throws URISyntaxException {
        log.debug("REST request to update Son : {}", son);
        if (son.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Son result = sonRepository.save(son);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, son.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sons : get all the sons.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sons in body
     */
    @GetMapping("/sons")
    public List<Son> getAllSons() {
        log.debug("REST request to get all Sons");
        return sonRepository.findAll();
    }

    /**
     * GET  /sons/:id : get the "id" son.
     *
     * @param id the id of the son to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the son, or with status 404 (Not Found)
     */
    @GetMapping("/sons/{id}")
    public ResponseEntity<Son> getSon(@PathVariable Long id) {
        log.debug("REST request to get Son : {}", id);
        Optional<Son> son = sonRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(son);
    }

    /**
     * DELETE  /sons/:id : delete the "id" son.
     *
     * @param id the id of the son to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sons/{id}")
    public ResponseEntity<Void> deleteSon(@PathVariable Long id) {
        log.debug("REST request to delete Son : {}", id);
        sonRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
