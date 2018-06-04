package com.mocean.pos.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Min(value = 0L)
    @Column(name = "total_tax")
    private Long totalTax;

    @Min(value = 0L)
    @Column(name = "discount")
    private Long discount;

    @Min(value = 0L)
    @Column(name = "total")
    private Long total;

    @OneToOne
    @JoinColumn(unique = true)
    private Payment payment;

    @OneToOne
    @JoinColumn(unique = true)
    private User createdBy;

    @OneToMany(mappedBy = "billNo")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<BillItem> billNos = new HashSet<>();

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

    public Long getTotalTax() {
        return totalTax;
    }

    public Bill totalTax(Long totalTax) {
        this.totalTax = totalTax;
        return this;
    }

    public void setTotalTax(Long totalTax) {
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

    public Long getTotal() {
        return total;
    }

    public Bill total(Long total) {
        this.total = total;
        return this;
    }

    public void setTotal(Long total) {
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

    public User getCreatedBy() {
        return createdBy;
    }

    public Bill createdBy(User user) {
        this.createdBy = user;
        return this;
    }

    public void setCreatedBy(User user) {
        this.createdBy = user;
    }

    public Set<BillItem> getBillNos() {
        return billNos;
    }

    public Bill billNos(Set<BillItem> billItems) {
        this.billNos = billItems;
        return this;
    }

    public Bill addBillNo(BillItem billItem) {
        this.billNos.add(billItem);
        billItem.setBillNo(this);
        return this;
    }

    public Bill removeBillNo(BillItem billItem) {
        this.billNos.remove(billItem);
        billItem.setBillNo(null);
        return this;
    }

    public void setBillNos(Set<BillItem> billItems) {
        this.billNos = billItems;
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
            ", totalTax=" + getTotalTax() +
            ", discount=" + getDiscount() +
            ", total=" + getTotal() +
            "}";
    }
}
