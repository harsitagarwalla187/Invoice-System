package com.harsit.backend.service.impl;

import com.harsit.backend.model.Company;
import com.harsit.backend.repository.CompanyRepository;
import com.harsit.backend.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Override
    public Company getCompanyByEmail(String email) {
        return companyRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Company not found"));
    }
}
