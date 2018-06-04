package com.mocean.pos.service.mapper;

import com.mocean.pos.domain.*;
import com.mocean.pos.service.dto.InventoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Inventory and its DTO InventoryDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface InventoryMapper extends EntityMapper<InventoryDTO, Inventory> {


    @Mapping(target = "products", ignore = true)
    Inventory toEntity(InventoryDTO inventoryDTO);

    default Inventory fromId(Long id) {
        if (id == null) {
            return null;
        }
        Inventory inventory = new Inventory();
        inventory.setId(id);
        return inventory;
    }
}
