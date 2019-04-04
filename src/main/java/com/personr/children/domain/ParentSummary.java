package com.personr.children.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ParentSummary.
 */
@Entity
@Table(name = "parent_summary")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ParentSummary implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "amount_of_persons")
    private Long amountOfPersons;

    @Column(name = "amount_of_children")
    private Long amountOfChildren;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAmountOfPersons() {
        return amountOfPersons;
    }

    public ParentSummary amountOfPersons(Long amountOfPersons) {
        this.amountOfPersons = amountOfPersons;
        return this;
    }

    public void setAmountOfPersons(Long amountOfPersons) {
        this.amountOfPersons = amountOfPersons;
    }

    public Long getAmountOfChildren() {
        return amountOfChildren;
    }

    public ParentSummary amountOfChildren(Long amountOfChildren) {
        this.amountOfChildren = amountOfChildren;
        return this;
    }

    public void setAmountOfChildren(Long amountOfChildren) {
        this.amountOfChildren = amountOfChildren;
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
        ParentSummary parentSummary = (ParentSummary) o;
        if (parentSummary.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), parentSummary.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ParentSummary{" +
            "id=" + getId() +
            ", amountOfPersons=" + getAmountOfPersons() +
            ", amountOfChildren=" + getAmountOfChildren() +
            "}";
    }
}
