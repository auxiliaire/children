package com.personr.children.web.rest;

import com.personr.children.ChildrenApp;

import com.personr.children.domain.Child;
import com.personr.children.repository.ChildRepository;
import com.personr.children.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.personr.children.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ChildResource REST controller.
 *
 * @see ChildResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ChildrenApp.class)
public class ChildResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_AGE = 1;
    private static final Integer UPDATED_AGE = 2;

    @Autowired
    private ChildRepository childRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restChildMockMvc;

    private Child child;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChildResource childResource = new ChildResource(childRepository);
        this.restChildMockMvc = MockMvcBuilders.standaloneSetup(childResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Child createEntity(EntityManager em) {
        Child child = new Child()
            .name(DEFAULT_NAME)
            .age(DEFAULT_AGE);
        return child;
    }

    @Before
    public void initTest() {
        child = createEntity(em);
    }

    @Test
    @Transactional
    public void createChild() throws Exception {
        int databaseSizeBeforeCreate = childRepository.findAll().size();

        // Create the Child
        restChildMockMvc.perform(post("/api/children")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(child)))
            .andExpect(status().isCreated());

        // Validate the Child in the database
        List<Child> childList = childRepository.findAll();
        assertThat(childList).hasSize(databaseSizeBeforeCreate + 1);
        Child testChild = childList.get(childList.size() - 1);
        assertThat(testChild.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testChild.getAge()).isEqualTo(DEFAULT_AGE);
    }

    @Test
    @Transactional
    public void createChildWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = childRepository.findAll().size();

        // Create the Child with an existing ID
        child.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChildMockMvc.perform(post("/api/children")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(child)))
            .andExpect(status().isBadRequest());

        // Validate the Child in the database
        List<Child> childList = childRepository.findAll();
        assertThat(childList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = childRepository.findAll().size();
        // set the field null
        child.setName(null);

        // Create the Child, which fails.

        restChildMockMvc.perform(post("/api/children")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(child)))
            .andExpect(status().isBadRequest());

        List<Child> childList = childRepository.findAll();
        assertThat(childList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAgeIsRequired() throws Exception {
        int databaseSizeBeforeTest = childRepository.findAll().size();
        // set the field null
        child.setAge(null);

        // Create the Child, which fails.

        restChildMockMvc.perform(post("/api/children")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(child)))
            .andExpect(status().isBadRequest());

        List<Child> childList = childRepository.findAll();
        assertThat(childList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllChildren() throws Exception {
        // Initialize the database
        childRepository.saveAndFlush(child);

        // Get all the childList
        restChildMockMvc.perform(get("/api/children?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(child.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)));
    }
    
    @Test
    @Transactional
    public void getChild() throws Exception {
        // Initialize the database
        childRepository.saveAndFlush(child);

        // Get the child
        restChildMockMvc.perform(get("/api/children/{id}", child.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(child.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE));
    }

    @Test
    @Transactional
    public void getNonExistingChild() throws Exception {
        // Get the child
        restChildMockMvc.perform(get("/api/children/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChild() throws Exception {
        // Initialize the database
        childRepository.saveAndFlush(child);

        int databaseSizeBeforeUpdate = childRepository.findAll().size();

        // Update the child
        Child updatedChild = childRepository.findById(child.getId()).get();
        // Disconnect from session so that the updates on updatedChild are not directly saved in db
        em.detach(updatedChild);
        updatedChild
            .name(UPDATED_NAME)
            .age(UPDATED_AGE);

        restChildMockMvc.perform(put("/api/children")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedChild)))
            .andExpect(status().isOk());

        // Validate the Child in the database
        List<Child> childList = childRepository.findAll();
        assertThat(childList).hasSize(databaseSizeBeforeUpdate);
        Child testChild = childList.get(childList.size() - 1);
        assertThat(testChild.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testChild.getAge()).isEqualTo(UPDATED_AGE);
    }

    @Test
    @Transactional
    public void updateNonExistingChild() throws Exception {
        int databaseSizeBeforeUpdate = childRepository.findAll().size();

        // Create the Child

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChildMockMvc.perform(put("/api/children")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(child)))
            .andExpect(status().isBadRequest());

        // Validate the Child in the database
        List<Child> childList = childRepository.findAll();
        assertThat(childList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteChild() throws Exception {
        // Initialize the database
        childRepository.saveAndFlush(child);

        int databaseSizeBeforeDelete = childRepository.findAll().size();

        // Delete the child
        restChildMockMvc.perform(delete("/api/children/{id}", child.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Child> childList = childRepository.findAll();
        assertThat(childList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Child.class);
        Child child1 = new Child();
        child1.setId(1L);
        Child child2 = new Child();
        child2.setId(child1.getId());
        assertThat(child1).isEqualTo(child2);
        child2.setId(2L);
        assertThat(child1).isNotEqualTo(child2);
        child1.setId(null);
        assertThat(child1).isNotEqualTo(child2);
    }
}
