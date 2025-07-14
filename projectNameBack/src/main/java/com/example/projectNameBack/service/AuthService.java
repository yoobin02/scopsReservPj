package com.example.projectNameBack.service;

import com.example.projectNameBack.repository.UserLoginInfoRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserLoginInfoRepository userLoginInfoRepository;
    public AuthService(UserLoginInfoRepository userLoginInfoRepository){
        this.userLoginInfoRepository = userLoginInfoRepository;
    }

    public boolean isLogin(){
        return true;
    }
}
