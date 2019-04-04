package com.personr.children.service;

import com.personr.children.domain.Child;
import com.personr.children.domain.Daughter;
import com.personr.children.domain.Preference;
import com.personr.children.domain.Son;
import com.personr.children.repository.ChildRepository;
import com.personr.children.service.dto.ChildInfoDTO;
import com.personr.children.service.dto.ColorDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class ColorService {

    private final Logger log = LoggerFactory.getLogger(ColorService.class);

    private final ChildRepository childRepository;

    public ColorService(ChildRepository childRepository) {
        this.childRepository = childRepository;
    }

    @Cacheable("com.personr.children.service.ColorService.colors")
    public Optional<ColorDTO> getColor(Long id) {
        Optional<Child> opt = childRepository.findById(id);
        if (opt.isPresent()) {
            Child child = opt.get();
            String color;
            if (child instanceof Daughter) {
                color = ((Daughter) child).getHairColor();
            } else if (child instanceof Son) {
                color = ((Son) child).getBicycleColor();
            } else {
                color = null;
            }
            return Optional.of(new ColorDTO(color));
        } else {
            return Optional.empty();
        }
    }

}
