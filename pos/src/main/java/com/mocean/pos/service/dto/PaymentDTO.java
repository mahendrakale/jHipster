package com.mocean.pos.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.mocean.pos.domain.enumeration.PaymentMode;

/**
 * A DTO for the Payment entity.
 */
public class PaymentDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate date;

    @Size(max = 19)
    private String card;

    @NotNull
    private PaymentMode paymentMode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getCard() {
        return card;
    }

    public void setCard(String card) {
        this.card = card;
    }

    public PaymentMode getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(PaymentMode paymentMode) {
        this.paymentMode = paymentMode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PaymentDTO paymentDTO = (PaymentDTO) o;
        if(paymentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), paymentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PaymentDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", card='" + getCard() + "'" +
            ", paymentMode='" + getPaymentMode() + "'" +
            "}";
    }
}
