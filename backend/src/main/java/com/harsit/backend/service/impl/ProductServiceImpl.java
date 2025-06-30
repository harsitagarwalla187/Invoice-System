package com.harsit.backend.service.impl;

import com.harsit.backend.model.Company;
import com.harsit.backend.model.Product;
import com.harsit.backend.repository.ProductRepository;
import com.harsit.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private
    ProductRepository productRepository;

    @Override
    public Product addProduct(Product product, Company company) {
        product.setCompany(company);
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts(Company company) {
        return productRepository.findByCompany(company);
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
