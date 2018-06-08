package com.mocean.pos.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the BillItem entity.
 */
public class BillItemDTO implements Serializable {

    private Long id;

    @NotNull
    @Min(value = 1)
    private Integer quantity;

    private Long tax;

    private Long productId;

    private Long billId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getTax() {
        return tax;
    }

    public void setTax(Long tax) {
        this.tax = tax;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getBillId() {
        return billId;
    }

    public void setBillId(Long billId) {
        this.billId = billId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BillItemDTO billItemDTO = (BillItemDTO) o;
        if(billItemDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), billItemDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BillItemDTO{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", tax=" + getTax() +
            "}";
    }
}
