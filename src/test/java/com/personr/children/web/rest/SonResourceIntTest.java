package com.personr.children.web.rest;

import com.personr.children.ChildrenApp;

import com.personr.children.domain.Son;
import com.personr.children.repository.SonRepository;
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
 * Test class for the SonResource REST controller.
 *
 * @see SonResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ChildrenApp.class)
public class SonResourceIntTest {

    private static final String DEFAULT_BICYCLE_COLOR = "AAAAAAAAAA";
    private static final String UPDATED_BICYCLE_COLOR = "BBBBBBBBBB";

    @Autowired
    private SonRepository sonRepository;

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

    private MockMvc restSonMockMvc;

    private Son son;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SonResource sonResource = new SonResource(sonRepository);
        this.restSonMockMvc = MockMvcBuilders.standaloneSetup(sonResource)
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
    public static Son createEntity(EntityManager em) {
        Son son = new Son()
            .bicycleColor(DEFAULT_BICYCLE_COLOR);
        return son;
    }

    @Before
    public void initTest() {
        son = createEntity(em);
    }

    @Test
    @Transactional
    public void createSon() throws Exception {
        int databaseSizeBeforeCreate = sonRepository.findAll().size();

        // Create the Son
        restSonMockMvc.perform(post("/api/sons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(son)))
            .andExpect(status().isCreated());

        // Validate the Son in the database
        List<Son> sonList = sonRepository.findAll();
        assertThat(sonList).hasSize(databaseSizeBeforeCreate + 1);
        Son testSon = sonList.get(sonList.size() - 1);
        assertThat(testSon.getBicycleColor()).isEqualTo(DEFAULT_BICYCLE_COLOR);
    }

    @Test
    @Transactional
    public void createSonWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sonRepository.findAll().size();

        // Create the Son with an existing ID
        son.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSonMockMvc.perform(post("/api/sons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(son)))
            .andExpect(status().isBadRequest());

        // Validate the Son in the database
        List<Son> sonList = sonRepository.findAll();
        assertThat(sonList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkBicycleColorIsRequired() throws Exception {
        int databaseSizeBeforeTest = sonRepository.findAll().size();
        // set the field null
        son.setBicycleColor(null);

        // Create the Son, which fails.

        restSonMockMvc.perform(post("/api/sons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(son)))
            .andExpect(status().isBadRequest());

        List<Son> sonList = sonRepository.findAll();
        assertThat(sonList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSons() throws Exception {
        // Initialize the database
        sonRepository.saveAndFlush(son);

        // Get all the sonList
        restSonMockMvc.perform(get("/api/sons?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(son.getId().intValue())))
            .andExpect(jsonPath("$.[*].bicycleColor").value(hasItem(DEFAULT_BICYCLE_COLOR.toString())));
    }
    
    @Test
    @Transactional
    public void getSon() throws Exception {
        // Initialize the database
        sonRepository.saveAndFlush(son);

        // Get the son
        restSonMockMvc.perform(get("/api/sons/{id}", son.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(son.getId().intValue()))
            .andExpect(jsonPath("$.bicycleColor").value(DEFAULT_BICYCLE_COLOR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSon() throws Exception {
        // Get the son
        restSonMockMvc.perform(get("/api/sons/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSon() throws Exception {
        // Initialize the database
        sonRepository.saveAndFlush(son);

        int databaseSizeBeforeUpdate = sonRepository.findAll().size();

        // Update the son
        Son updatedSon = sonRepository.findById(son.getId()).get();
        // Disconnect from session so that the updates on updatedSon are not directly saved in db
        em.detach(updatedSon);
        updatedSon
            .bicycleColor(UPDATED_BICYCLE_COLOR);

        restSonMockMvc.perform(put("/api/sons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSon)))
            .andExpect(status().isOk());

        // Validate the Son in the database
        List<Son> sonList = sonRepository.findAll();
        assertThat(sonList).hasSize(databaseSizeBeforeUpdate);
        Son testSon = sonList.get(sonList.size() - 1);
        assertThat(testSon.getBicycleColor()).isEqualTo(UPDATED_BICYCLE_COLOR);
    }

    @Test
    @Transactional
    public void updateNonExistingSon() throws Exception {
        int databaseSizeBeforeUpdate = sonRepository.findAll().size();

        // Create the Son

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSonMockMvc.perform(put("/api/sons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(son)))
            .andExpect(status().isBadRequest());

        // Validate the Son in the database
        List<Son> sonList = sonRepository.findAll();
        assertThat(sonList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSon() throws Exception {
        // Initialize the database
        sonRepository.saveAndFlush(son);

        int databaseSizeBeforeDelete = sonRepository.findAll().size();

        // Delete the son
        restSonMockMvc.perform(delete("/api/sons/{id}", son.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Son> sonList = sonRepository.findAll();
        assertThat(sonList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Son.class);
        Son son1 = new Son();
        son1.setId(1L);
        Son son2 = new Son();
        son2.setId(son1.getId());
        assertThat(son1).isEqualTo(son2);
        son2.setId(2L);
        assertThat(son1).isNotEqualTo(son2);
        son1.setId(null);
        assertThat(son1).isNotEqualTo(son2);
    }
}
