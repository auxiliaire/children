package com.personr.children.web.rest;
import com.personr.children.domain.Child;
import com.personr.children.repository.ChildRepository;
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
 * REST controller for managing Child.
 */
@RestController
@RequestMapping("/api")
public class ChildResource {

    private final Logger log = LoggerFactory.getLogger(ChildResource.class);

    private static final String ENTITY_NAME = "child";

    private final ChildRepository childRepository;

    public ChildResource(ChildRepository childRepository) {
        this.childRepository = childRepository;
    }

    /**
     * POST  /children : Create a new child.
     *
     * @param child the child to create
     * @return the ResponseEntity with status 201 (Created) and with body the new child, or with status 400 (Bad Request) if the child has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/children")
    public ResponseEntity<Child> createChild(@Valid @RequestBody Child child) throws URISyntaxException {
        log.debug("REST request to save Child : {}", child);
        if (child.getId() != null) {
            throw new BadRequestAlertException("A new child cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Child result = childRepository.save(child);
        return ResponseEntity.created(new URI("/api/children/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /children : Updates an existing child.
     *
     * @param child the child to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated child,
     * or with status 400 (Bad Request) if the child is not valid,
     * or with status 500 (Internal Server Error) if the child couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/children")
    public ResponseEntity<Child> updateChild(@Valid @RequestBody Child child) throws URISyntaxException {
        log.debug("REST request to update Child : {}", child);
        if (child.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Child result = childRepository.save(child);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, child.getId().toString()))
            .body(result);
    }

    /**
     * GET  /children : get all the children.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of children in body
     */
    @GetMapping("/children")
    public List<Child> getAllChildren() {
        log.debug("REST request to get all Children");
        return childRepository.findAll();
    }

    /**
     * GET  /children/:id : get the "id" child.
     *
     * @param id the id of the child to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the child, or with status 404 (Not Found)
     */
    @GetMapping("/children/{id}")
    public ResponseEntity<Child> getChild(@PathVariable Long id) {
        log.debug("REST request to get Child : {}", id);
        Optional<Child> child = childRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(child);
    }

    /**
     * DELETE  /children/:id : delete the "id" child.
     *
     * @param id the id of the child to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/children/{id}")
    public ResponseEntity<Void> deleteChild(@PathVariable Long id) {
        log.debug("REST request to delete Child : {}", id);
        childRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
