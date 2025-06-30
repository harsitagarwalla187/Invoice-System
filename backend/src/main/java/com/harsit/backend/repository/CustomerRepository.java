package com.harsit.backend.repository;

import com.harsit.backend.model.Company;
import com.harsit.backend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByCompany(Company company);
}
