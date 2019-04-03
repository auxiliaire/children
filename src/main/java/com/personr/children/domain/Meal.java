package com.personr.children.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Meal.
 */
@Entity
@Table(name = "meal")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Meal implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "invented", nullable = false)
    private ZonedDateTime invented;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Meal name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ZonedDateTime getInvented() {
        return invented;
    }

    public Meal invented(ZonedDateTime invented) {
        this.invented = invented;
        return this;
    }

    public void setInvented(ZonedDateTime invented) {
        this.invented = invented;
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
        Meal meal = (Meal) o;
        if (meal.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), meal.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Meal{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", invented='" + getInvented() + "'" +
            "}";
    }
}
