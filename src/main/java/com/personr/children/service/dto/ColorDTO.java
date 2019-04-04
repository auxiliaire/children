package com.personr.children.service.dto;

import com.personr.children.domain.Child;
import com.personr.children.domain.Daughter;
import com.personr.children.domain.Son;

public class ColorDTO {

    private String color;

    public ColorDTO(String color) {
        this.color = color;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
