package com.harsit.backend.repository;

import com.harsit.backend.model.Company;
import com.harsit.backend.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByCompany(Company company);
}
