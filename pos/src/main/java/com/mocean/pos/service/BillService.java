package com.mocean.pos.service;

import com.mocean.pos.service.dto.BillDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Bill.
 */
public interface BillService {

    /**
     * Save a bill.
     *
     * @param billDTO the entity to save
     * @return the persisted entity
     */
    BillDTO save(BillDTO billDTO);

    /**
     * Get all the bills.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<BillDTO> findAll(Pageable pageable);

    /**
     * Get the "id" bill.
     *
     * @param id the id of the entity
     * @return the entity
     */
    BillDTO findOne(Long id);

    /**
     * Delete the "id" bill.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
