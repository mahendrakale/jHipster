package com.mocean.pos.domain;

import com.fasterxml.jackson.annotation.JsonInclude;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Bill.
 */
@Entity
@Table(name = "bill")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Bill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "bill_date", nullable = false)
    private LocalDate billDate;

    @NotNull
    @Column(name = "bill_no", nullable = false)
    private String billNo;

    @Size(max = 13)
    @Column(name = "total_tax", length = 13)
    private String totalTax;

    @Min(value = 0L)
    @Column(name = "discount")
    private Long discount;

    @Size(max = 13)
    @Column(name = "total", length = 13)
    private String total;

    @OneToOne
    @JoinColumn(unique = true)
    private Payment payment;

    @OneToMany(mappedBy = "bill")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<BillItem> items = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getBillDate() {
        return billDate;
    }

    public Bill billDate(LocalDate billDate) {
        this.billDate = billDate;
        return this;
    }

    public void setBillDate(LocalDate billDate) {
        this.billDate = billDate;
    }

    public String getBillNo() {
        return billNo;
    }

    public Bill billNo(String billNo) {
        this.billNo = billNo;
        return this;
    }

    public void setBillNo(String billNo) {
        this.billNo = billNo;
    }

    public String getTotalTax() {
        return totalTax;
    }

    public Bill totalTax(String totalTax) {
        this.totalTax = totalTax;
        return this;
    }

    public void setTotalTax(String totalTax) {
        this.totalTax = totalTax;
    }

    public Long getDiscount() {
        return discount;
    }

    public Bill discount(Long discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Long discount) {
        this.discount = discount;
    }

    public String getTotal() {
        return total;
    }

    public Bill total(String total) {
        this.total = total;
        return this;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public Payment getPayment() {
        return payment;
    }

    public Bill payment(Payment payment) {
        this.payment = payment;
        return this;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public Set<BillItem> getItems() {
        return items;
    }

    public Bill items(Set<BillItem> billItems) {
        this.items = billItems;
        return this;
    }

    public Bill addItems(BillItem billItem) {
        this.items.add(billItem);
        billItem.setBill(this);
        return this;
    }

    public Bill removeItems(BillItem billItem) {
        this.items.remove(billItem);
        billItem.setBill(null);
        return this;
    }

    public void setItems(Set<BillItem> billItems) {
        this.items = billItems;
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
        Bill bill = (Bill) o;
        if (bill.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bill.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Bill{" +
            "id=" + getId() +
            ", billDate='" + getBillDate() + "'" +
            ", billNo='" + getBillNo() + "'" +
            ", totalTax='" + getTotalTax() + "'" +
            ", discount=" + getDiscount() +
            ", total='" + getTotal() + "'" +
            "}";
    }
}
