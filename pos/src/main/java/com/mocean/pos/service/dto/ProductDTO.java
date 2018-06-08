package com.mocean.pos.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.mocean.pos.domain.enumeration.Category;

/**
 * A DTO for the Product entity.
 */
public class ProductDTO implements Serializable {

    private Long id;

    @NotNull
    private String productName;

    private String description;

    private Category category;

    private String barcode;

    @NotNull
    private LocalDate mfDate;

    @NotNull
    private LocalDate expDate;

    @NotNull
    @Min(value = 0L)
    private Long price;

    private Long taxId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public LocalDate getMfDate() {
        return mfDate;
    }

    public void setMfDate(LocalDate mfDate) {
        this.mfDate = mfDate;
    }

    public LocalDate getExpDate() {
        return expDate;
    }

    public void setExpDate(LocalDate expDate) {
        this.expDate = expDate;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Long getTaxId() {
        return taxId;
    }

    public void setTaxId(Long taxId) {
        this.taxId = taxId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProductDTO productDTO = (ProductDTO) o;
        if(productDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductDTO{" +
            "id=" + getId() +
            ", productName='" + getProductName() + "'" +
            ", description='" + getDescription() + "'" +
            ", category='" + getCategory() + "'" +
            ", barcode='" + getBarcode() + "'" +
            ", mfDate='" + getMfDate() + "'" +
            ", expDate='" + getExpDate() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}
