package com.harsit.backend.controller;

import com.harsit.backend.model.Company;
import com.harsit.backend.model.Product;
import com.harsit.backend.service.CompanyService;
import com.harsit.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import com.harsit.backend.security.JwtService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired private ProductService productService;
    @Autowired private CompanyService companyService;
    @Autowired private JwtService jwtService;
    @Autowired private HttpServletRequest request;

    @PostMapping
    public Product addProduct(@RequestBody Product product, @RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail((token.substring(7)));
        Company company = companyService.getCompanyByEmail(email);
        return productService.addProduct(product, company);
    }

    @GetMapping
    public List<Product> getAllProducts(@RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail((token.substring(7)));
        Company company = companyService.getCompanyByEmail(email);
        return productService.getAllProducts(company);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}

