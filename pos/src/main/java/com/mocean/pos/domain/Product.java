package com.mocean.pos.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.mocean.pos.domain.enumeration.Category;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private Category category;

    @Column(name = "barcode")
    private String barcode;

    @NotNull
    @Column(name = "mf_date", nullable = false)
    private LocalDate mfDate;

    @NotNull
    @Column(name = "exp_date", nullable = false)
    private LocalDate expDate;

    @NotNull
    @Min(value = 0L)
    @Column(name = "price", nullable = false)
    private Long price;

    @OneToOne
    @JoinColumn(unique = true)
    private Tax tax;

    @ManyToOne
    private Inventory inventory;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public Product productName(String productName) {
        this.productName = productName;
        return this;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public Product description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public Product category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getBarcode() {
        return barcode;
    }

    public Product barcode(String barcode) {
        this.barcode = barcode;
        return this;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public LocalDate getMfDate() {
        return mfDate;
    }

    public Product mfDate(LocalDate mfDate) {
        this.mfDate = mfDate;
        return this;
    }

    public void setMfDate(LocalDate mfDate) {
        this.mfDate = mfDate;
    }

    public LocalDate getExpDate() {
        return expDate;
    }

    public Product expDate(LocalDate expDate) {
        this.expDate = expDate;
        return this;
    }

    public void setExpDate(LocalDate expDate) {
        this.expDate = expDate;
    }

    public Long getPrice() {
        return price;
    }

    public Product price(Long price) {
        this.price = price;
        return this;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Tax getTax() {
        return tax;
    }

    public Product tax(Tax tax) {
        this.tax = tax;
        return this;
    }

    public void setTax(Tax tax) {
        this.tax = tax;
    }

    public Inventory getInventory() {
        return inventory;
    }

    public Product inventory(Inventory inventory) {
        this.inventory = inventory;
        return this;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Product product = (Product) o;
        if (product.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), product.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Product{" +
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
