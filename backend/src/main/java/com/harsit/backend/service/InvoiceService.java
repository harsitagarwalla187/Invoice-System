package com.harsit.backend.service;

import com.harsit.backend.model.Company;
import com.harsit.backend.model.Invoice;
import java.util.Map;

import java.util.List;

public interface InvoiceService {
    Invoice createInvoice(Invoice invoice, Company company);
    Invoice createInvoice(Company company, Long customerId, List<Map<String, Object>> items);
    List<Invoice> getAllInvoices(Company company);
    Invoice getInvoiceById(Long id);
    byte[] generateInvoicePdf(Long id, Company company);
}

