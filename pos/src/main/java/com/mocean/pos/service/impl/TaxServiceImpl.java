package com.mocean.pos.service.impl;

import com.mocean.pos.service.TaxService;
import com.mocean.pos.domain.Tax;
import com.mocean.pos.repository.TaxRepository;
import com.mocean.pos.service.dto.TaxDTO;
import com.mocean.pos.service.mapper.TaxMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Tax.
 */
@Service
@Transactional
public class TaxServiceImpl implements TaxService {

    private final Logger log = LoggerFactory.getLogger(TaxServiceImpl.class);

    private final TaxRepository taxRepository;

    private final TaxMapper taxMapper;

    public TaxServiceImpl(TaxRepository taxRepository, TaxMapper taxMapper) {
        this.taxRepository = taxRepository;
        this.taxMapper = taxMapper;
    }

    /**
     * Save a tax.
     *
     * @param taxDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TaxDTO save(TaxDTO taxDTO) {
        log.debug("Request to save Tax : {}", taxDTO);
        Tax tax = taxMapper.toEntity(taxDTO);
        tax = taxRepository.save(tax);
        return taxMapper.toDto(tax);
    }

    /**
     * Get all the taxes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TaxDTO> findAll() {
        log.debug("Request to get all Taxes");
        return taxRepository.findAll().stream()
            .map(taxMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one tax by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TaxDTO findOne(Long id) {
        log.debug("Request to get Tax : {}", id);
        Tax tax = taxRepository.findOne(id);
        return taxMapper.toDto(tax);
    }

    /**
     * Delete the tax by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Tax : {}", id);
        taxRepository.delete(id);
    }
}
