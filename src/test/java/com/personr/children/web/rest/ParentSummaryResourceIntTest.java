package com.personr.children.web.rest;

import com.personr.children.ChildrenApp;

import com.personr.children.domain.ParentSummary;
import com.personr.children.repository.ParentSummaryRepository;
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
 * Test class for the ParentSummaryResource REST controller.
 *
 * @see ParentSummaryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ChildrenApp.class)
public class ParentSummaryResourceIntTest {

    private static final Long DEFAULT_AMOUNT_OF_PERSONS = 1L;
    private static final Long UPDATED_AMOUNT_OF_PERSONS = 2L;

    private static final Long DEFAULT_AMOUNT_OF_CHILDREN = 1L;
    private static final Long UPDATED_AMOUNT_OF_CHILDREN = 2L;

    @Autowired
    private ParentSummaryRepository parentSummaryRepository;

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

    private MockMvc restParentSummaryMockMvc;

    private ParentSummary parentSummary;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ParentSummaryResource parentSummaryResource = new ParentSummaryResource(parentSummaryRepository);
        this.restParentSummaryMockMvc = MockMvcBuilders.standaloneSetup(parentSummaryResource)
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
    public static ParentSummary createEntity(EntityManager em) {
        ParentSummary parentSummary = new ParentSummary()
            .amountOfPersons(DEFAULT_AMOUNT_OF_PERSONS)
            .amountOfChildren(DEFAULT_AMOUNT_OF_CHILDREN);
        return parentSummary;
    }

    @Before
    public void initTest() {
        parentSummary = createEntity(em);
    }

    @Test
    @Transactional
    public void createParentSummary() throws Exception {
        int databaseSizeBeforeCreate = parentSummaryRepository.findAll().size();

        // Create the ParentSummary
        restParentSummaryMockMvc.perform(post("/api/parent-summaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parentSummary)))
            .andExpect(status().isCreated());

        // Validate the ParentSummary in the database
        List<ParentSummary> parentSummaryList = parentSummaryRepository.findAll();
        assertThat(parentSummaryList).hasSize(databaseSizeBeforeCreate + 1);
        ParentSummary testParentSummary = parentSummaryList.get(parentSummaryList.size() - 1);
        assertThat(testParentSummary.getAmountOfPersons()).isEqualTo(DEFAULT_AMOUNT_OF_PERSONS);
        assertThat(testParentSummary.getAmountOfChildren()).isEqualTo(DEFAULT_AMOUNT_OF_CHILDREN);
    }

    @Test
    @Transactional
    public void createParentSummaryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = parentSummaryRepository.findAll().size();

        // Create the ParentSummary with an existing ID
        parentSummary.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParentSummaryMockMvc.perform(post("/api/parent-summaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parentSummary)))
            .andExpect(status().isBadRequest());

        // Validate the ParentSummary in the database
        List<ParentSummary> parentSummaryList = parentSummaryRepository.findAll();
        assertThat(parentSummaryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllParentSummaries() throws Exception {
        // Initialize the database
        parentSummaryRepository.saveAndFlush(parentSummary);

        // Get all the parentSummaryList
        restParentSummaryMockMvc.perform(get("/api/parent-summaries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parentSummary.getId().intValue())))
            .andExpect(jsonPath("$.[*].amountOfPersons").value(hasItem(DEFAULT_AMOUNT_OF_PERSONS.intValue())))
            .andExpect(jsonPath("$.[*].amountOfChildren").value(hasItem(DEFAULT_AMOUNT_OF_CHILDREN.intValue())));
    }
    
    @Test
    @Transactional
    public void getParentSummary() throws Exception {
        // Initialize the database
        parentSummaryRepository.saveAndFlush(parentSummary);

        // Get the parentSummary
        restParentSummaryMockMvc.perform(get("/api/parent-summaries/{id}", parentSummary.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(parentSummary.getId().intValue()))
            .andExpect(jsonPath("$.amountOfPersons").value(DEFAULT_AMOUNT_OF_PERSONS.intValue()))
            .andExpect(jsonPath("$.amountOfChildren").value(DEFAULT_AMOUNT_OF_CHILDREN.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingParentSummary() throws Exception {
        // Get the parentSummary
        restParentSummaryMockMvc.perform(get("/api/parent-summaries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParentSummary() throws Exception {
        // Initialize the database
        parentSummaryRepository.saveAndFlush(parentSummary);

        int databaseSizeBeforeUpdate = parentSummaryRepository.findAll().size();

        // Update the parentSummary
        ParentSummary updatedParentSummary = parentSummaryRepository.findById(parentSummary.getId()).get();
        // Disconnect from session so that the updates on updatedParentSummary are not directly saved in db
        em.detach(updatedParentSummary);
        updatedParentSummary
            .amountOfPersons(UPDATED_AMOUNT_OF_PERSONS)
            .amountOfChildren(UPDATED_AMOUNT_OF_CHILDREN);

        restParentSummaryMockMvc.perform(put("/api/parent-summaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedParentSummary)))
            .andExpect(status().isOk());

        // Validate the ParentSummary in the database
        List<ParentSummary> parentSummaryList = parentSummaryRepository.findAll();
        assertThat(parentSummaryList).hasSize(databaseSizeBeforeUpdate);
        ParentSummary testParentSummary = parentSummaryList.get(parentSummaryList.size() - 1);
        assertThat(testParentSummary.getAmountOfPersons()).isEqualTo(UPDATED_AMOUNT_OF_PERSONS);
        assertThat(testParentSummary.getAmountOfChildren()).isEqualTo(UPDATED_AMOUNT_OF_CHILDREN);
    }

    @Test
    @Transactional
    public void updateNonExistingParentSummary() throws Exception {
        int databaseSizeBeforeUpdate = parentSummaryRepository.findAll().size();

        // Create the ParentSummary

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParentSummaryMockMvc.perform(put("/api/parent-summaries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parentSummary)))
            .andExpect(status().isBadRequest());

        // Validate the ParentSummary in the database
        List<ParentSummary> parentSummaryList = parentSummaryRepository.findAll();
        assertThat(parentSummaryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteParentSummary() throws Exception {
        // Initialize the database
        parentSummaryRepository.saveAndFlush(parentSummary);

        int databaseSizeBeforeDelete = parentSummaryRepository.findAll().size();

        // Delete the parentSummary
        restParentSummaryMockMvc.perform(delete("/api/parent-summaries/{id}", parentSummary.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ParentSummary> parentSummaryList = parentSummaryRepository.findAll();
        assertThat(parentSummaryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParentSummary.class);
        ParentSummary parentSummary1 = new ParentSummary();
        parentSummary1.setId(1L);
        ParentSummary parentSummary2 = new ParentSummary();
        parentSummary2.setId(parentSummary1.getId());
        assertThat(parentSummary1).isEqualTo(parentSummary2);
        parentSummary2.setId(2L);
        assertThat(parentSummary1).isNotEqualTo(parentSummary2);
        parentSummary1.setId(null);
        assertThat(parentSummary1).isNotEqualTo(parentSummary2);
    }
}
