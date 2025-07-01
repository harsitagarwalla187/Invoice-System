package com.harsit.backend.controller;

import com.harsit.backend.model.Company;
import com.harsit.backend.security.JwtService;
import com.harsit.backend.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired private CompanyService companyService;
    @Autowired private JwtService jwtService;


    @GetMapping("/profile")
    public Company getProfile(@RequestHeader("Authorization") String token) {
        String email = jwtService.extractEmail(token.substring(7));
        Company company = companyService.getCompanyByEmail(email);
        return company  ;
    }

    @PutMapping("/profile")
    public Company updateProfile(@RequestHeader("Authorization") String token,
                                                 @RequestBody Company updatedCompany) {
        String email = jwtService.extractEmail(token.substring(7));
        Company savedCompany = companyService.updateCompanyProfile(email, updatedCompany);
        return savedCompany;
    }

}

