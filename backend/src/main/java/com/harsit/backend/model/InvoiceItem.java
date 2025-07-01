package com.harsit.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class InvoiceItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer quantity;
    private Double price;
    private Double total;

    @ManyToOne
    @JsonIgnore
    private Invoice invoice;

    @ManyToOne
    @JsonIgnore
    private Product product;
}
