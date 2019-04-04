package com.personr.children.service;

import com.personr.children.domain.Preference;
import com.personr.children.repository.ChildRepository;
import com.personr.children.service.dto.ChildInfoDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class ChildInfoService {

    private final Logger log = LoggerFactory.getLogger(ChildInfoService.class);

    private final ChildRepository childRepository;

    public ChildInfoService(ChildRepository childRepository) {
        this.childRepository = childRepository;
    }

    public Optional<ChildInfoDTO> getFavorite(Long id) {
        Preference preference = childRepository.getFavorite(id);
        Optional re;
        if (preference == null) {
            re = Optional.empty();
        } else {
            re = Optional.of(new ChildInfoDTO(
                preference.getChild().getParent(),
                preference.getMeal()
            ));
        }
        return re;
    }
}
