package com.harsit.backend.service.impl;

import com.harsit.backend.model.*;
import com.harsit.backend.repository.InvoiceRepository;
import com.harsit.backend.service.CustomerService;
import com.harsit.backend.service.InvoiceService;
import com.harsit.backend.service.ProductService;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired private InvoiceRepository invoiceRepository;
    @Autowired private CustomerService customerService;
    @Autowired private ProductService productService;

    @Override
    public Invoice createInvoice(Invoice invoice, Company company) {
        Customer existingCustomer = customerService.getCustomerById(invoice.getCustomer().getId());
        invoice.setCustomer(existingCustomer);
        invoice.setCompany(company);
        invoice.setDate(LocalDate.now());

        if (invoice.getItems() != null) {
            invoice.getItems().forEach(item -> {
                item.setInvoice(invoice);
                item.setTotal(item.getPrice() * item.getQuantity());
            });

            double totalAmount = invoice.getItems().stream()
                    .mapToDouble(InvoiceItem::getTotal)
                    .sum();
            invoice.setTotalAmount(totalAmount);
        }

        return invoiceRepository.save(invoice);
    }

    public Invoice createInvoice(Company company, Long customerId, List<Map<String, Object>> items) {
        Customer customer = customerService.getCustomerById(customerId);

        Invoice invoice = new Invoice();
        invoice.setCompany(company);
        invoice.setCustomer(customer);
        invoice.setDate(LocalDate.now());

        List<InvoiceItem> invoiceItems = new ArrayList<>();
        double totalAmount = 0.0;

        for (Map<String, Object> itemMap : items) {
            Long productId = Long.valueOf(itemMap.get("productId").toString());
            int quantity = Integer.parseInt(itemMap.get("quantity").toString());

            Product product = productService.getProductById(productId);

            InvoiceItem item = new InvoiceItem();
            item.setInvoice(invoice);
            item.setProduct(product);
            item.setQuantity(quantity);
            item.setPrice(product.getPrice());
            item.setTotal(product.getPrice() * quantity);

            invoiceItems.add(item);
            totalAmount += item.getTotal();
        }

        invoice.setItems(invoiceItems);
        invoice.setTotalAmount(totalAmount);

        System.out.println(invoice);

        return invoiceRepository.save(invoice);
    }

    @Override
    public List<Invoice> getAllInvoices(Company company) {
        return invoiceRepository.findByCompany(company);
    }

    @Override
    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found with ID: " + id));
    }

    public byte[] generateInvoicePdf(Long id, Company company) {
        Invoice invoice = getInvoiceById(id);

        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Font sectionFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
            Font bodyFont = FontFactory.getFont(FontFactory.HELVETICA, 10);

            Paragraph title = new Paragraph("INVOICE", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Company: " + invoice.getCompany().getName(), bodyFont));
            document.add(new Paragraph("Email: " + invoice.getCompany().getEmail(), bodyFont));
            document.add(new Paragraph("Invoice #: " + invoice.getId(), bodyFont));
            document.add(new Paragraph("Date: " + invoice.getDate(), bodyFont));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Customer: " + invoice.getCustomer().getName(), bodyFont));
            document.add(new Paragraph("Email: " + invoice.getCustomer().getEmail(), bodyFont));
            document.add(new Paragraph("Contact: " + invoice.getCustomer().getContact(), bodyFont));
            document.add(new Paragraph(" "));

            PdfPTable table = new PdfPTable(4);
            table.setWidthPercentage(100);
            table.setWidths(new float[]{4, 1, 2, 2});

            Stream.of("Product", "Qty", "Price", "Total").forEach(headerTitle -> {
                PdfPCell header = new PdfPCell(new Phrase(headerTitle, sectionFont));
                header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                table.addCell(header);
            });

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
            throw new RuntimeException("Failed to generate PDF for Invoice ID " + id, e);
        }
    }
}
