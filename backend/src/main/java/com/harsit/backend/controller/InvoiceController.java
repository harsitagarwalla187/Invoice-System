package com.harsit.backend.controller;

import com.harsit.backend.model.*;
import com.harsit.backend.security.JwtService;
import com.harsit.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    @Autowired private InvoiceService invoiceService;
    @Autowired private CustomerService customerService;
    @Autowired private ProductService productService;
    @Autowired private CompanyService companyService;
    @Autowired private JwtService jwtService;

    @GetMapping
    public List<Invoice> getAllInvoices(@RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.substring(7));
        Company company = companyService.getCompanyByEmail(email);
        List<Invoice> invoices = invoiceService.getAllInvoices(company);
        System.out.println(invoices);
        return invoices;
    }

    @PostMapping
    public ResponseEntity<Invoice> createInvoice(
            @RequestBody Map<String, Object> request,
            @RequestHeader("Authorization") String token) {

        String email = jwtService.extractEmail(token.substring(7));
        Company company = companyService.getCompanyByEmail(email);

        Long customerId = Long.valueOf(request.get("customerId").toString());

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> items = (List<Map<String, Object>>) request.get("items");

        Invoice invoice = invoiceService.createInvoice(company, customerId, items);
        return ResponseEntity.ok(invoice);
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> downloadInvoicePDF(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.substring(7));
        Company company = companyService.getCompanyByEmail(email);

        byte[] pdfBytes = invoiceService.generateInvoicePdf(id, company);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition
                .builder("attachment")
                .filename("invoice_" + id + ".pdf")
                .build());

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

}
