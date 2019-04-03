package com.personr.children.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Preference.
 */
@Entity
@Table(name = "preference")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Preference implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "weight", nullable = false)
    private Integer weight;

    @OneToOne
    @JoinColumn(unique = true)
    private Meal meal;

    @ManyToOne
    @JsonIgnoreProperties("preferences")
    private Child child;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getWeight() {
        return weight;
    }

    public Preference weight(Integer weight) {
        this.weight = weight;
        return this;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Meal getMeal() {
        return meal;
    }

    public Preference meal(Meal meal) {
        this.meal = meal;
        return this;
    }

    public void setMeal(Meal meal) {
        this.meal = meal;
    }

    public Child getChild() {
        return child;
    }

    public Preference child(Child child) {
        this.child = child;
        return this;
    }

    public void setChild(Child child) {
        this.child = child;
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
        Preference preference = (Preference) o;
        if (preference.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), preference.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Preference{" +
            "id=" + getId() +
            ", weight=" + getWeight() +
            "}";
    }
}
