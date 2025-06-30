package com.harsit.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    private String password;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    private List<Customer> customers;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    private List<Product> products;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    private List<Invoice> invoices;
}

