package com.harsit.backend.service;

import com.harsit.backend.model.Company;

public interface CompanyService {
    Company getCompanyByEmail(String email);
}