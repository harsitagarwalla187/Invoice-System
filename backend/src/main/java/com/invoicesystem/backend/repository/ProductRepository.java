package com.invoicesystem.backend.repository;

import com.invoicesystem.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
