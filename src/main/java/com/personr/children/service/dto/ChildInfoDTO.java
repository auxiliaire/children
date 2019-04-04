package com.personr.children.service.dto;

import com.personr.children.domain.Meal;
import com.personr.children.domain.Person;

public class ChildInfoDTO {

    private Person parent;
    private Meal favorite;

    public ChildInfoDTO(Person parent, Meal favorite) {
        this.parent = parent;
        this.favorite = favorite;
    }

    public Person getParent() {
        return parent;
    }

    public void setParent(Person parent) {
        this.parent = parent;
    }

    public Meal getFavorite() {
        return favorite;
    }

    public void setFavorite(Meal favorite) {
        this.favorite = favorite;
    }
}
