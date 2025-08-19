package com.example.projectNameBack.controller;

import com.example.projectNameBack.dto.SaveUserLoginInfoDto;
import com.example.projectNameBack.dto.SongRegisterDto;
import com.example.projectNameBack.dto.UserInfoDto;
import com.example.projectNameBack.entity.User;
import com.example.projectNameBack.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class FirstController {
    private final AuthService authService;

    public FirstController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/scops/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData){
        String userID = loginData.get("userID");
        String password = loginData.get("password");

        UserInfoDto response = authService.login(userID, password);

        if(response != null){
            return ResponseEntity.ok(response); // 로그인 성공: 사용자 정보 반환
        } else {
            return ResponseEntity.status(401).body("로그인 실패");
        }
    }

    @PostMapping("/scops/userRegister")
    public ResponseEntity<Boolean> userRegister(@RequestBody SaveUserLoginInfoDto dto){
        try {
            User saved = authService.saveUserInfo(dto);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity.ok(false);
        }
    }

}
