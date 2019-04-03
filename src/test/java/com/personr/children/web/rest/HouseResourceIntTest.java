package com.personr.children.web.rest;

import com.personr.children.ChildrenApp;

import com.personr.children.domain.House;
import com.personr.children.repository.HouseRepository;
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

import com.personr.children.domain.enumeration.HouseType;
/**
 * Test class for the HouseResource REST controller.
 *
 * @see HouseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ChildrenApp.class)
public class HouseResourceIntTest {

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_ZIP_CODE = "AAAAAAAAAA";
    private static final String UPDATED_ZIP_CODE = "BBBBBBBBBB";

    private static final HouseType DEFAULT_TYPE = HouseType.FLAT;
    private static final HouseType UPDATED_TYPE = HouseType.HOUSE;

    @Autowired
    private HouseRepository houseRepository;

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

    private MockMvc restHouseMockMvc;

    private House house;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HouseResource houseResource = new HouseResource(houseRepository);
        this.restHouseMockMvc = MockMvcBuilders.standaloneSetup(houseResource)
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
    public static House createEntity(EntityManager em) {
        House house = new House()
            .address(DEFAULT_ADDRESS)
            .zipCode(DEFAULT_ZIP_CODE)
            .type(DEFAULT_TYPE);
        return house;
    }

    @Before
    public void initTest() {
        house = createEntity(em);
    }

    @Test
    @Transactional
    public void createHouse() throws Exception {
        int databaseSizeBeforeCreate = houseRepository.findAll().size();

        // Create the House
        restHouseMockMvc.perform(post("/api/houses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(house)))
            .andExpect(status().isCreated());

        // Validate the House in the database
        List<House> houseList = houseRepository.findAll();
        assertThat(houseList).hasSize(databaseSizeBeforeCreate + 1);
        House testHouse = houseList.get(houseList.size() - 1);
        assertThat(testHouse.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testHouse.getZipCode()).isEqualTo(DEFAULT_ZIP_CODE);
        assertThat(testHouse.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createHouseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = houseRepository.findAll().size();

        // Create the House with an existing ID
        house.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHouseMockMvc.perform(post("/api/houses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(house)))
            .andExpect(status().isBadRequest());

        // Validate the House in the database
        List<House> houseList = houseRepository.findAll();
        assertThat(houseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAddressIsRequired() throws Exception {
        int databaseSizeBeforeTest = houseRepository.findAll().size();
        // set the field null
        house.setAddress(null);

        // Create the House, which fails.

        restHouseMockMvc.perform(post("/api/houses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(house)))
            .andExpect(status().isBadRequest());

        List<House> houseList = houseRepository.findAll();
        assertThat(houseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkZipCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = houseRepository.findAll().size();
        // set the field null
        house.setZipCode(null);

        // Create the House, which fails.

        restHouseMockMvc.perform(post("/api/houses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(house)))
            .andExpect(status().isBadRequest());

        List<House> houseList = houseRepository.findAll();
        assertThat(houseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = houseRepository.findAll().size();
        // set the field null
        house.setType(null);

        // Create the House, which fails.

        restHouseMockMvc.perform(post("/api/houses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(house)))
            .andExpect(status().isBadRequest());

        List<House> houseList = houseRepository.findAll();
        assertThat(houseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllHouses() throws Exception {
        // Initialize the database
        houseRepository.saveAndFlush(house);

        // Get all the houseList
        restHouseMockMvc.perform(get("/api/houses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(house.getId().intValue())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].zipCode").value(hasItem(DEFAULT_ZIP_CODE.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getHouse() throws Exception {
        // Initialize the database
        houseRepository.saveAndFlush(house);

        // Get the house
        restHouseMockMvc.perform(get("/api/houses/{id}", house.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(house.getId().intValue()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.zipCode").value(DEFAULT_ZIP_CODE.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHouse() throws Exception {
        // Get the house
        restHouseMockMvc.perform(get("/api/houses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHouse() throws Exception {
        // Initialize the database
        houseRepository.saveAndFlush(house);

        int databaseSizeBeforeUpdate = houseRepository.findAll().size();

        // Update the house
        House updatedHouse = houseRepository.findById(house.getId()).get();
        // Disconnect from session so that the updates on updatedHouse are not directly saved in db
        em.detach(updatedHouse);
        updatedHouse
            .address(UPDATED_ADDRESS)
            .zipCode(UPDATED_ZIP_CODE)
            .type(UPDATED_TYPE);

        restHouseMockMvc.perform(put("/api/houses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHouse)))
            .andExpect(status().isOk());

        // Validate the House in the database
        List<House> houseList = houseRepository.findAll();
        assertThat(houseList).hasSize(databaseSizeBeforeUpdate);
        House testHouse = houseList.get(houseList.size() - 1);
        assertThat(testHouse.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testHouse.getZipCode()).isEqualTo(UPDATED_ZIP_CODE);
        assertThat(testHouse.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingHouse() throws Exception {
        int databaseSizeBeforeUpdate = houseRepository.findAll().size();

        // Create the House

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHouseMockMvc.perform(put("/api/houses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(house)))
            .andExpect(status().isBadRequest());

        // Validate the House in the database
        List<House> houseList = houseRepository.findAll();
        assertThat(houseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHouse() throws Exception {
        // Initialize the database
        houseRepository.saveAndFlush(house);

        int databaseSizeBeforeDelete = houseRepository.findAll().size();

        // Delete the house
        restHouseMockMvc.perform(delete("/api/houses/{id}", house.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<House> houseList = houseRepository.findAll();
        assertThat(houseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(House.class);
        House house1 = new House();
        house1.setId(1L);
        House house2 = new House();
        house2.setId(house1.getId());
        assertThat(house1).isEqualTo(house2);
        house2.setId(2L);
        assertThat(house1).isNotEqualTo(house2);
        house1.setId(null);
        assertThat(house1).isNotEqualTo(house2);
    }
}
