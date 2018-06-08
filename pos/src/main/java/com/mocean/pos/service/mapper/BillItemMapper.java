package com.mocean.pos.service.mapper;

import com.mocean.pos.domain.*;
import com.mocean.pos.service.dto.BillItemDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BillItem and its DTO BillItemDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class, BillMapper.class})
public interface BillItemMapper extends EntityMapper<BillItemDTO, BillItem> {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "bill.id", target = "billId")
    BillItemDTO toDto(BillItem billItem);

    @Mapping(source = "productId", target = "product")
    @Mapping(source = "billId", target = "bill")
    BillItem toEntity(BillItemDTO billItemDTO);

    default BillItem fromId(Long id) {
        if (id == null) {
            return null;
        }
        BillItem billItem = new BillItem();
        billItem.setId(id);
        return billItem;
    }
}
