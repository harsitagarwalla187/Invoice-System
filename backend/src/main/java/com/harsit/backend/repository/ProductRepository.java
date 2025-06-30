package com.harsit.backend.repository;

import com.harsit.backend.model.Company;
import com.harsit.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCompany(Company company);
}

