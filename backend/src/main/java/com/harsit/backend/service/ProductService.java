package com.harsit.backend.service;

import com.harsit.backend.model.Company;
import com.harsit.backend.model.Product;

import java.util.List;

public interface ProductService {
    Product addProduct(Product product, Company company);
    List<Product> getAllProducts(Company company);
    Product getProductById(Long id);
    void deleteProduct(Long id);
}

