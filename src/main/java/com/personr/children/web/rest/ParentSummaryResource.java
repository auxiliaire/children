package com.personr.children.web.rest;
import com.personr.children.domain.ParentSummary;
import com.personr.children.repository.ParentSummaryRepository;
import com.personr.children.web.rest.errors.BadRequestAlertException;
import com.personr.children.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ParentSummary.
 */
@RestController
@RequestMapping("/api")
public class ParentSummaryResource {

    private final Logger log = LoggerFactory.getLogger(ParentSummaryResource.class);

    private static final String ENTITY_NAME = "parentSummary";

    private final ParentSummaryRepository parentSummaryRepository;

    public ParentSummaryResource(ParentSummaryRepository parentSummaryRepository) {
        this.parentSummaryRepository = parentSummaryRepository;
    }

    /**
     * POST  /parent-summaries : Create a new parentSummary.
     *
     * @param parentSummary the parentSummary to create
     * @return the ResponseEntity with status 201 (Created) and with body the new parentSummary, or with status 400 (Bad Request) if the parentSummary has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/parent-summaries")
    public ResponseEntity<ParentSummary> createParentSummary(@RequestBody ParentSummary parentSummary) throws URISyntaxException {
        log.debug("REST request to save ParentSummary : {}", parentSummary);
        if (parentSummary.getId() != null) {
            throw new BadRequestAlertException("A new parentSummary cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ParentSummary result = parentSummaryRepository.save(parentSummary);
        return ResponseEntity.created(new URI("/api/parent-summaries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /parent-summaries : Updates an existing parentSummary.
     *
     * @param parentSummary the parentSummary to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated parentSummary,
     * or with status 400 (Bad Request) if the parentSummary is not valid,
     * or with status 500 (Internal Server Error) if the parentSummary couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/parent-summaries")
    public ResponseEntity<ParentSummary> updateParentSummary(@RequestBody ParentSummary parentSummary) throws URISyntaxException {
        log.debug("REST request to update ParentSummary : {}", parentSummary);
        if (parentSummary.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ParentSummary result = parentSummaryRepository.save(parentSummary);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, parentSummary.getId().toString()))
            .body(result);
    }

    /**
     * GET  /parent-summaries : get all the parentSummaries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of parentSummaries in body
     */
    @GetMapping("/parent-summaries")
    public List<ParentSummary> getAllParentSummaries() {
        log.debug("REST request to get all ParentSummaries");
        return parentSummaryRepository.findAll();
    }

    /**
     * GET  /persons/children : get all the parentSummaries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of parentSummaries in body
     */
    @GetMapping("/persons/children")
    public List<ParentSummary> getPersonsChildren() {
        log.debug("REST request to get all ParentSummaries");
        return parentSummaryRepository.findAll();
    }

    /**
     * GET  /parent-summaries/:id : get the "id" parentSummary.
     *
     * @param id the id of the parentSummary to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the parentSummary, or with status 404 (Not Found)
     */
    @GetMapping("/parent-summaries/{id}")
    public ResponseEntity<ParentSummary> getParentSummary(@PathVariable Long id) {
        log.debug("REST request to get ParentSummary : {}", id);
        Optional<ParentSummary> parentSummary = parentSummaryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(parentSummary);
    }

    /**
     * DELETE  /parent-summaries/:id : delete the "id" parentSummary.
     *
     * @param id the id of the parentSummary to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/parent-summaries/{id}")
    public ResponseEntity<Void> deleteParentSummary(@PathVariable Long id) {
        log.debug("REST request to delete ParentSummary : {}", id);
        parentSummaryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
