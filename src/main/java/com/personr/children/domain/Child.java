package com.personr.children.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Child.
 */
@Entity(name = "Child")
@Table(name = "child")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(
    discriminatorType = DiscriminatorType.STRING,
    name = "gender",
    columnDefinition = "VARCHAR(8)"
)
public class Child {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "name", nullable = false)
    protected String name;

    @NotNull
    @Column(name = "age", nullable = false)
    protected Integer age;

    @OneToMany(mappedBy = "child")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    protected Set<Preference> preferences = new HashSet<>();
    @ManyToOne
    @JoinColumn(name = "person_id")
    @JsonIgnoreProperties("children")
    protected Person parent;

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

    public Child name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public Child age(Integer age) {
        this.age = age;
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Set<Preference> getPreferences() {
        return preferences;
    }

    public Child preferences(Set<Preference> preferences) {
        this.preferences = preferences;
        return this;
    }

    public Child addPreferences(Preference preference) {
        this.preferences.add(preference);
        preference.setChild(this);
        return this;
    }

    public Child removePreferences(Preference preference) {
        this.preferences.remove(preference);
        preference.setChild(null);
        return this;
    }

    public void setPreferences(Set<Preference> preferences) {
        this.preferences = preferences;
    }

    public Person getParent() {
        return parent;
    }

    public Child parent(Person person) {
        this.parent = person;
        return this;
    }

    public void setParent(Person person) {
        this.parent = person;
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
        Child child = (Child) o;
        if (child.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), child.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Child{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", age=" + getAge() +
            "}";
    }
}
