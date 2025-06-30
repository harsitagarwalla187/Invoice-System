package com.harsit.backend.controller;

import com.harsit.backend.model.*;
import com.harsit.backend.service.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.OutputStream;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    @Autowired private InvoiceService invoiceService;
    @Autowired private CustomerService customerService;
    @Autowired private ProductService productService;

    // 1️⃣ Create Invoice
    @PostMapping
    public ResponseEntity<?> createInvoice(@RequestBody Invoice invoice, @RequestAttribute("company") Company company) {

        // ✅ Fetch and set existing customer
        Customer existingCustomer = customerService.getCustomerById(invoice.getCustomer().getId());
        invoice.setCustomer(existingCustomer);

        // ✅ Set invoice date (if not already set)
        if (invoice.getDate() == null) {
            invoice.setDate(LocalDate.now());
        }

        // ✅ Fetch existing products and compute totals
        for (InvoiceItem item : invoice.getItems()) {
            Product existingProduct = productService.getProductById(item.getProduct().getId());
            item.setProduct(existingProduct);
            item.setTotal(item.getQuantity() * item.getPrice());
            item.setInvoice(invoice); // important!
        }

        Invoice savedInvoice = invoiceService.createInvoice(invoice, company);
        return new ResponseEntity<>(savedInvoice, HttpStatus.CREATED);
    }

    // 2️⃣ Get All Invoices for a Company
    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices(@RequestAttribute("company") Company company) {
        List<Invoice> invoices = invoiceService.getAllInvoices(company);
        return ResponseEntity.ok(invoices);
    }

    // 3️⃣ Get Invoice by ID
    @GetMapping("/{id}")
    public ResponseEntity<Invoice> getInvoiceById(@PathVariable Long id) {
        Invoice invoice = invoiceService.getInvoiceById(id);
        return ResponseEntity.ok(invoice);
    }

    // 4️⃣ Download Invoice PDF
    @GetMapping("/{id}/pdf")
    public void downloadInvoicePdf(@PathVariable Long id, HttpServletResponse response) {
        byte[] pdfBytes = invoiceService.generateInvoicePdf(id);

        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=invoice_" + id + ".pdf");

        try (OutputStream out = response.getOutputStream()) {
            out.write(pdfBytes);
        } catch (Exception e) {
            throw new RuntimeException("Failed to download invoice PDF", e);
        }
    }
}
