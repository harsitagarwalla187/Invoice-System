package com.invoicesystem.backend.controller;

import com.invoicesystem.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        String email = body.get("email");
        String password = body.get("password");
        String address = body.get("address");
        String phone = body.get("phone");

        return ResponseEntity.ok(authService.register(name, email, password, address, phone));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {

        System.out.println(">>> LOGIN CALLED");

        String email = body.get("email");
        String password = body.get("password");

        String token = authService.login(email, password);
        return ResponseEntity.ok(Collections.singletonMap("token", token));
    }
}
