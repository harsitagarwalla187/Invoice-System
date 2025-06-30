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

    private Company getCurrentCompany() {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String email = jwtService.extractEmail(token);
            return companyService.getCompanyByEmail(email);
        }
        return null;
    }

    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        Company company = getCurrentCompany();
        return productService.addProduct(product, company);
    }

    @GetMapping
    public List<Product> getAllProducts(@RequestHeader("Authorization") String token) {
        Company company = getCurrentCompany();
        return productService.getAllProducts(company);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}

