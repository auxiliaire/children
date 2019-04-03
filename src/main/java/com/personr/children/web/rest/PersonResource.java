package com.personr.children.web.rest;
import com.personr.children.domain.Person;
import com.personr.children.repository.PersonRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Person.
 */
@RestController
@RequestMapping("/api")
public class PersonResource {

    private final Logger log = LoggerFactory.getLogger(PersonResource.class);

    private static final String ENTITY_NAME = "person";

    private final PersonRepository personRepository;

    public PersonResource(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    /**
     * POST  /people : Create a new person.
     *
     * @param person the person to create
     * @return the ResponseEntity with status 201 (Created) and with body the new person, or with status 400 (Bad Request) if the person has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/people")
    public ResponseEntity<Person> createPerson(@Valid @RequestBody Person person) throws URISyntaxException {
        log.debug("REST request to save Person : {}", person);
        if (person.getId() != null) {
            throw new BadRequestAlertException("A new person cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Person result = personRepository.save(person);
        return ResponseEntity.created(new URI("/api/people/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /people : Updates an existing person.
     *
     * @param person the person to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated person,
     * or with status 400 (Bad Request) if the person is not valid,
     * or with status 500 (Internal Server Error) if the person couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/people")
    public ResponseEntity<Person> updatePerson(@Valid @RequestBody Person person) throws URISyntaxException {
        log.debug("REST request to update Person : {}", person);
        if (person.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Person result = personRepository.save(person);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, person.getId().toString()))
            .body(result);
    }

    /**
     * GET  /people : get all the people.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of people in body
     */
    @GetMapping("/people")
    public List<Person> getAllPeople(@RequestParam(required = false) String filter) {
        if ("house-is-null".equals(filter)) {
            log.debug("REST request to get all Persons where house is null");
            return StreamSupport
                .stream(personRepository.findAll().spliterator(), false)
                .filter(person -> person.getHouse() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all People");
        return personRepository.findAll();
    }

    /**
     * GET  /people/:id : get the "id" person.
     *
     * @param id the id of the person to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the person, or with status 404 (Not Found)
     */
    @GetMapping("/people/{id}")
    public ResponseEntity<Person> getPerson(@PathVariable Long id) {
        log.debug("REST request to get Person : {}", id);
        Optional<Person> person = personRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(person);
    }

    /**
     * DELETE  /people/:id : delete the "id" person.
     *
     * @param id the id of the person to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/people/{id}")
    public ResponseEntity<Void> deletePerson(@PathVariable Long id) {
        log.debug("REST request to delete Person : {}", id);
        personRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
