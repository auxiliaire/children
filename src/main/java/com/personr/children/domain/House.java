package com.personr.children.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.personr.children.domain.enumeration.HouseType;

/**
 * A House.
 */
@Entity
@Table(name = "house")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class House implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "address", nullable = false)
    private String address;

    @NotNull
    @Size(min = 3)
    @Column(name = "zip_code", nullable = false)
    private String zipCode;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type", nullable = false)
    private HouseType type;

    @OneToOne
    @JoinColumn(unique = true)
    private Person person;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public House address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getZipCode() {
        return zipCode;
    }

    public House zipCode(String zipCode) {
        this.zipCode = zipCode;
        return this;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public HouseType getType() {
        return type;
    }

    public House type(HouseType type) {
        this.type = type;
        return this;
    }

    public void setType(HouseType type) {
        this.type = type;
    }

    public Person getPerson() {
        return person;
    }

    public House person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        House house = (House) o;
        if (house.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), house.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "House{" +
            "id=" + getId() +
            ", address='" + getAddress() + "'" +
            ", zipCode='" + getZipCode() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
