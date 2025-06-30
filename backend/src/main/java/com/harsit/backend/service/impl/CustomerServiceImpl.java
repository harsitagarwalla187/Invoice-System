package com.harsit.backend.service.impl;

import com.harsit.backend.model.Company;
import com.harsit.backend.model.Customer;
import com.harsit.backend.repository.CustomerRepository;
import com.harsit.backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public Customer addCustomer(Customer customer, Company company) {
        customer.setCompany(company);
        return customerRepository.save(customer);
    }

    @Override
    public List<Customer> getAllCustomers(Company company) {

        return customerRepository.findByCompany(company);
    }

    @Override
    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    @Override
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}
