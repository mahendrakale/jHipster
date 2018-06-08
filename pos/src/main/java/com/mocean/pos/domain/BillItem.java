package com.mocean.pos.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A BillItem.
 */
@Entity
@Table(name = "bill_item")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BillItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(value = 1)
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "tax")
    private Long tax;

    @OneToOne
    @JoinColumn(unique = true)
    private Product product;

    @ManyToOne
    @JsonIgnore
    private Bill bill;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public BillItem quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getTax() {
        return tax;
    }

    public BillItem tax(Long tax) {
        this.tax = tax;
        return this;
    }

    public void setTax(Long tax) {
        this.tax = tax;
    }

    public Product getProduct() {
        return product;
    }

    public BillItem product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Bill getBill() {
        return bill;
    }

    public BillItem bill(Bill bill) {
        this.bill = bill;
        return this;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
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
        BillItem billItem = (BillItem) o;
        if (billItem.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), billItem.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BillItem{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", tax=" + getTax() +
            "}";
    }
}
