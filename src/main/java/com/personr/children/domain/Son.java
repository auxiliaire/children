package com.personr.children.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Son.
 */
@Entity
@Table(name = "child")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Son extends Child implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "bicycle_color", nullable = false)
    private String bicycleColor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBicycleColor() {
        return bicycleColor;
    }

    public Son bicycleColor(String bicycleColor) {
        this.bicycleColor = bicycleColor;
        return this;
    }

    public void setBicycleColor(String bicycleColor) {
        this.bicycleColor = bicycleColor;
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
        Son son = (Son) o;
        if (son.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), son.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Son{" +
            "id=" + getId() +
            ", bicycleColor='" + getBicycleColor() + "'" +
            "}";
    }
}
