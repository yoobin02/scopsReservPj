package com.example.projectNameBack.controller;

import com.example.projectNameBack.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class FirstController {
    private final AuthService authService;

    public FirstController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/scops/login")
    public ResponseEntity<Boolean> login(){
        return ResponseEntity.ok(authService.isLogin());
    }
}
