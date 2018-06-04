package com.mocean.pos.service.mapper;

import com.mocean.pos.domain.*;
import com.mocean.pos.service.dto.ProductDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Product and its DTO ProductDTO.
 */
@Mapper(componentModel = "spring", uses = {TaxMapper.class, InventoryMapper.class})
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {

    @Mapping(source = "tax.id", target = "taxId")
    @Mapping(source = "inventory.id", target = "inventoryId")
    ProductDTO toDto(Product product);

    @Mapping(source = "taxId", target = "tax")
    @Mapping(source = "inventoryId", target = "inventory")
    Product toEntity(ProductDTO productDTO);

    default Product fromId(Long id) {
        if (id == null) {
            return null;
        }
        Product product = new Product();
        product.setId(id);
        return product;
    }
}
