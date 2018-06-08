package com.mocean.pos.service;

import com.mocean.pos.service.dto.TaxDTO;
import java.util.List;

/**
 * Service Interface for managing Tax.
 */
public interface TaxService {

    /**
     * Save a tax.
     *
     * @param taxDTO the entity to save
     * @return the persisted entity
     */
    TaxDTO save(TaxDTO taxDTO);

    /**
     * Get all the taxes.
     *
     * @return the list of entities
     */
    List<TaxDTO> findAll();

    /**
     * Get the "id" tax.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TaxDTO findOne(Long id);

    /**
     * Delete the "id" tax.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
