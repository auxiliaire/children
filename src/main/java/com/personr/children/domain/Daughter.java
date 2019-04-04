package com.personr.children.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Daughter.
 */
@Entity
@Table(name = "child")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Daughter extends Child implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotNull
    @Column(name = "hair_color", nullable = false)
    private String hairColor;

    public String getHairColor() {
        return hairColor;
    }

    public Daughter hairColor(String hairColor) {
        this.hairColor = hairColor;
        return this;
    }

    public void setHairColor(String hairColor) {
        this.hairColor = hairColor;
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
        Daughter daughter = (Daughter) o;
        if (daughter.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), daughter.getId());
    }

    @Override
    public String toString() {
        return "Daughter{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", age=" + getAge() +
            ", hairColor='" + getHairColor() + "'" +
            "}";
    }
}
