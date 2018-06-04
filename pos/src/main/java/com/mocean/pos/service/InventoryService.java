package com.mocean.pos.service;

import com.mocean.pos.service.dto.InventoryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Inventory.
 */
public interface InventoryService {

    /**
     * Save a inventory.
     *
     * @param inventoryDTO the entity to save
     * @return the persisted entity
     */
    InventoryDTO save(InventoryDTO inventoryDTO);

    /**
     * Get all the inventories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<InventoryDTO> findAll(Pageable pageable);

    /**
     * Get the "id" inventory.
     *
     * @param id the id of the entity
     * @return the entity
     */
    InventoryDTO findOne(Long id);

    /**
     * Delete the "id" inventory.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
