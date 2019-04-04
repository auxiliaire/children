package com.personr.children.web.rest;

import com.personr.children.ChildrenApp;

import com.personr.children.domain.Daughter;
import com.personr.children.repository.DaughterRepository;
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
 * Test class for the DaughterResource REST controller.
 *
 * @see DaughterResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ChildrenApp.class)
public class DaughterResourceIntTest {

    private static final String DEFAULT_HAIR_COLOR = "AAAAAAAAAA";
    private static final String UPDATED_HAIR_COLOR = "BBBBBBBBBB";

    @Autowired
    private DaughterRepository daughterRepository;

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

    private MockMvc restDaughterMockMvc;

    private Daughter daughter;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DaughterResource daughterResource = new DaughterResource(daughterRepository);
        this.restDaughterMockMvc = MockMvcBuilders.standaloneSetup(daughterResource)
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
    public static Daughter createEntity(EntityManager em) {
        Daughter daughter = new Daughter()
            .hairColor(DEFAULT_HAIR_COLOR);
        return daughter;
    }

    @Before
    public void initTest() {
        daughter = createEntity(em);
    }

    @Test
    @Transactional
    public void createDaughter() throws Exception {
        int databaseSizeBeforeCreate = daughterRepository.findAll().size();

        // Create the Daughter
        restDaughterMockMvc.perform(post("/api/daughters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(daughter)))
            .andExpect(status().isCreated());

        // Validate the Daughter in the database
        List<Daughter> daughterList = daughterRepository.findAll();
        assertThat(daughterList).hasSize(databaseSizeBeforeCreate + 1);
        Daughter testDaughter = daughterList.get(daughterList.size() - 1);
        assertThat(testDaughter.getHairColor()).isEqualTo(DEFAULT_HAIR_COLOR);
    }

    @Test
    @Transactional
    public void createDaughterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = daughterRepository.findAll().size();

        // Create the Daughter with an existing ID
        daughter.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDaughterMockMvc.perform(post("/api/daughters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(daughter)))
            .andExpect(status().isBadRequest());

        // Validate the Daughter in the database
        List<Daughter> daughterList = daughterRepository.findAll();
        assertThat(daughterList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkHairColorIsRequired() throws Exception {
        int databaseSizeBeforeTest = daughterRepository.findAll().size();
        // set the field null
        daughter.setHairColor(null);

        // Create the Daughter, which fails.

        restDaughterMockMvc.perform(post("/api/daughters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(daughter)))
            .andExpect(status().isBadRequest());

        List<Daughter> daughterList = daughterRepository.findAll();
        assertThat(daughterList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDaughters() throws Exception {
        // Initialize the database
        daughterRepository.saveAndFlush(daughter);

        // Get all the daughterList
        restDaughterMockMvc.perform(get("/api/daughters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(daughter.getId().intValue())))
            .andExpect(jsonPath("$.[*].hairColor").value(hasItem(DEFAULT_HAIR_COLOR.toString())));
    }
    
    @Test
    @Transactional
    public void getDaughter() throws Exception {
        // Initialize the database
        daughterRepository.saveAndFlush(daughter);

        // Get the daughter
        restDaughterMockMvc.perform(get("/api/daughters/{id}", daughter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(daughter.getId().intValue()))
            .andExpect(jsonPath("$.hairColor").value(DEFAULT_HAIR_COLOR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDaughter() throws Exception {
        // Get the daughter
        restDaughterMockMvc.perform(get("/api/daughters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDaughter() throws Exception {
        // Initialize the database
        daughterRepository.saveAndFlush(daughter);

        int databaseSizeBeforeUpdate = daughterRepository.findAll().size();

        // Update the daughter
        Daughter updatedDaughter = daughterRepository.findById(daughter.getId()).get();
        // Disconnect from session so that the updates on updatedDaughter are not directly saved in db
        em.detach(updatedDaughter);
        updatedDaughter
            .hairColor(UPDATED_HAIR_COLOR);

        restDaughterMockMvc.perform(put("/api/daughters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDaughter)))
            .andExpect(status().isOk());

        // Validate the Daughter in the database
        List<Daughter> daughterList = daughterRepository.findAll();
        assertThat(daughterList).hasSize(databaseSizeBeforeUpdate);
        Daughter testDaughter = daughterList.get(daughterList.size() - 1);
        assertThat(testDaughter.getHairColor()).isEqualTo(UPDATED_HAIR_COLOR);
    }

    @Test
    @Transactional
    public void updateNonExistingDaughter() throws Exception {
        int databaseSizeBeforeUpdate = daughterRepository.findAll().size();

        // Create the Daughter

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDaughterMockMvc.perform(put("/api/daughters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(daughter)))
            .andExpect(status().isBadRequest());

        // Validate the Daughter in the database
        List<Daughter> daughterList = daughterRepository.findAll();
        assertThat(daughterList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDaughter() throws Exception {
        // Initialize the database
        daughterRepository.saveAndFlush(daughter);

        int databaseSizeBeforeDelete = daughterRepository.findAll().size();

        // Delete the daughter
        restDaughterMockMvc.perform(delete("/api/daughters/{id}", daughter.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Daughter> daughterList = daughterRepository.findAll();
        assertThat(daughterList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Daughter.class);
        Daughter daughter1 = new Daughter();
        daughter1.setId(1L);
        Daughter daughter2 = new Daughter();
        daughter2.setId(daughter1.getId());
        assertThat(daughter1).isEqualTo(daughter2);
        daughter2.setId(2L);
        assertThat(daughter1).isNotEqualTo(daughter2);
        daughter1.setId(null);
        assertThat(daughter1).isNotEqualTo(daughter2);
    }
}
