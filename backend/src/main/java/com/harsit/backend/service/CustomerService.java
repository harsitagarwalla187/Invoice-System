package com.harsit.backend.service;

import com.harsit.backend.model.Company;
import com.harsit.backend.model.Customer;

import java.util.List;

public interface CustomerService {
    Customer addCustomer(Customer customer, Company company);
    List<Customer> getAllCustomers(Company company);
    Customer getCustomerById(Long id);
    void deleteCustomer(Long id);
}
