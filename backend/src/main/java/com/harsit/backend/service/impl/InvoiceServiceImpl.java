package com.harsit.backend.service.impl;

import com.harsit.backend.model.Company;
import com.harsit.backend.model.Customer;
import com.harsit.backend.model.Invoice;
import com.harsit.backend.model.InvoiceItem;
import com.harsit.backend.repository.InvoiceRepository;
import com.harsit.backend.service.CustomerService;
import com.harsit.backend.service.InvoiceService;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.stream.Stream;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private CustomerService customerService;

    @Override
    public Invoice createInvoice(Invoice invoice, Company company) {

        // Safely fetch existing customer by ID
        Long customerId = invoice.getCustomer().getId();
        Customer existingCustomer = customerService.getCustomerById(customerId);
        invoice.setCustomer(existingCustomer);


        // Set the company for the invoice
        invoice.setCompany(company);

        // Link each invoice item back to the invoice
        if (invoice.getItems() != null) {
            invoice.getItems().forEach(item -> item.setInvoice(invoice));
        }

        // Calculate total amount
        double total = invoice.getItems().stream()
                .mapToDouble(item -> item.getQuantity() * item.getPrice())
                .sum();
        invoice.setTotalAmount(total);

        return invoiceRepository.save(invoice);
    }

    @Override
    public List<Invoice> getAllInvoices(Company company) {
        return invoiceRepository.findByCompany(company);
    }

    @Override
    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
    }

    @Override
    public byte[] generateInvoicePdf(Long id) {
        Invoice invoice = getInvoiceById(id);

        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();

            // Fonts
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Font sectionFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
            Font bodyFont = FontFactory.getFont(FontFactory.HELVETICA, 10);

            // Title
            Paragraph title = new Paragraph("INVOICE", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(new Paragraph(" "));

            // Company Info
            document.add(new Paragraph("Company: " + invoice.getCompany().getName(), bodyFont));
            document.add(new Paragraph("Email: " + invoice.getCompany().getEmail(), bodyFont));
            document.add(new Paragraph("Invoice #: " + invoice.getInvoiceNumber(), bodyFont));
            document.add(new Paragraph("Date: " + invoice.getDate(), bodyFont));
            document.add(new Paragraph(" "));

            // Customer Info
            document.add(new Paragraph("Customer: " + invoice.getCustomer().getName(), bodyFont));
            document.add(new Paragraph("Email: " + invoice.getCustomer().getEmail(), bodyFont));
            document.add(new Paragraph("Contact: " + invoice.getCustomer().getContact(), bodyFont));
            document.add(new Paragraph(" "));

            // Invoice Items Table
            PdfPTable table = new PdfPTable(4); // Product, Qty, Price, Total
            table.setWidthPercentage(100);
            table.setWidths(new float[]{4, 1, 2, 2});

            // Header Cells
            Stream.of("Product", "Qty", "Price", "Total")
                    .forEach(columnTitle -> {
                        PdfPCell header = new PdfPCell();
                        header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                        header.setPhrase(new Phrase(columnTitle, sectionFont));
                        table.addCell(header);
                    });

            // Item Rows
            for (InvoiceItem item : invoice.getItems()) {
                table.addCell(new Phrase(item.getProduct().getName(), bodyFont));
                table.addCell(new Phrase(String.valueOf(item.getQuantity()), bodyFont));
                table.addCell(new Phrase(String.format("₹%.2f", item.getPrice()), bodyFont));
                table.addCell(new Phrase(String.format("₹%.2f", item.getTotal()), bodyFont));
            }

            document.add(table);
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Total Amount: ₹" + String.format("%.2f", invoice.getTotalAmount()), sectionFont));

            Paragraph footer = new Paragraph("Thank you for your business!", bodyFont);
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("PDF generation failed", e);
        }
    }
}
