package com.harsit.backend.service.impl;

import com.harsit.backend.model.Company;
import com.harsit.backend.model.Customer;
import com.harsit.backend.model.Invoice;
import com.harsit.backend.model.InvoiceItem;
import com.harsit.backend.repository.CustomerRepository;
import com.harsit.backend.repository.InvoiceRepository;
import com.harsit.backend.service.CustomerService;
import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired private CustomerRepository customerRepository;
    @Autowired private InvoiceRepository invoiceRepository;

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

    public byte[] generateInvoicePdf(Long invoiceId, Company company) {
        Invoice invoice = invoiceRepository.findByIdAndCompany(invoiceId, company);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document document = new Document();

        try {
            PdfWriter.getInstance(document, baos);
            document.open();

            document.add(new Paragraph("Invoice #" + invoice.getId()));
            document.add(new Paragraph("Customer: " + invoice.getCustomer().getName()));
            document.add(new Paragraph("Date: " + invoice.getDate()));
            document.add(new Paragraph("Total: ₹" + invoice.getTotalAmount()));
            document.add(new Paragraph("Items:"));

            for (InvoiceItem item : invoice.getItems()) {
                document.add(new Paragraph(
                        "- " + item.getProduct().getName() + " x " + item.getQuantity() + " @ ₹" + item.getPrice()
                ));
            }

            document.close();
        } catch (Exception e) {
            throw new RuntimeException("PDF generation failed", e);
        }

        return baos.toByteArray();
    }

}
