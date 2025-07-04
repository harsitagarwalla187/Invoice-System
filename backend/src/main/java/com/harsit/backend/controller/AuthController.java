package com.harsit.backend.controller;

import com.harsit.backend.model.Company;
import com.harsit.backend.repository.CompanyRepository;
import com.harsit.backend.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private CompanyRepository companyRepository;
    @Autowired private JwtService jwtService;
    @Autowired private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Company company) {
        if (companyRepository.findByEmail(company.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        company.setPassword(passwordEncoder.encode(company.getPassword()));
        return ResponseEntity.ok(companyRepository.save(company));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Company loginRequest) {
        Company db = companyRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Company not found"));

        if(passwordEncoder.matches(db.getPassword(), loginRequest.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        String token = jwtService.generateToken(db.getEmail());
        return ResponseEntity.ok().body(Map.of("token", token));
    }
}
