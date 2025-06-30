package com.harsit.backend.controller;

import com.harsit.backend.model.Company;
import com.harsit.backend.model.Customer;
import com.harsit.backend.security.JwtService;
import com.harsit.backend.service.CompanyService;
import com.harsit.backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired private CustomerService customerService;
    @Autowired private CompanyService companyService;
    @Autowired private JwtService jwtService;

    @PostMapping
    public Customer addCustomer(@RequestBody Customer customer, @RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.substring(7));
        Company company = companyService.getCompanyByEmail(email);
        return customerService.addCustomer(customer, company);
    }

    @GetMapping
    public List<Customer> getAllCustomers(@RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.substring(7));
        Company company = companyService.getCompanyByEmail(email);
        return customerService.getAllCustomers(company);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
    }
}

