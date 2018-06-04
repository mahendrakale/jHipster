package com.mocean.pos.service.mapper;

import com.mocean.pos.domain.*;
import com.mocean.pos.service.dto.BillDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Bill and its DTO BillDTO.
 */
@Mapper(componentModel = "spring", uses = {PaymentMapper.class, UserMapper.class})
public interface BillMapper extends EntityMapper<BillDTO, Bill> {

    @Mapping(source = "payment.id", target = "paymentId")
    @Mapping(source = "createdBy.id", target = "createdById")
    BillDTO toDto(Bill bill);

    @Mapping(source = "paymentId", target = "payment")
    @Mapping(source = "createdById", target = "createdBy")
    @Mapping(target = "billNos", ignore = true)
    Bill toEntity(BillDTO billDTO);

    default Bill fromId(Long id) {
        if (id == null) {
            return null;
        }
        Bill bill = new Bill();
        bill.setId(id);
        return bill;
    }
}
