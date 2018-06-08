package com.mocean.pos.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.mocean.pos.domain.enumeration.Category;

/**
 * A Tax.
 */
@Entity
@Table(name = "tax")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Tax implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "tax_name", nullable = false)
    private String taxName;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private Category category;

    @NotNull
    @Min(value = 0L)
    @Max(value = 100L)
    @Column(name = "jhi_percent", nullable = false)
    private Long percent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTaxName() {
        return taxName;
    }

    public Tax taxName(String taxName) {
        this.taxName = taxName;
        return this;
    }

    public void setTaxName(String taxName) {
        this.taxName = taxName;
    }

    public Category getCategory() {
        return category;
    }

    public Tax category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Long getPercent() {
        return percent;
    }

    public Tax percent(Long percent) {
        this.percent = percent;
        return this;
    }

    public void setPercent(Long percent) {
        this.percent = percent;
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
        Tax tax = (Tax) o;
        if (tax.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tax.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Tax{" +
            "id=" + getId() +
            ", taxName='" + getTaxName() + "'" +
            ", category='" + getCategory() + "'" +
            ", percent=" + getPercent() +
            "}";
    }
}
