package com.example.projectNameBack.service;

import com.example.projectNameBack.dto.SaveUserLoginInfoDto;
import com.example.projectNameBack.dto.UserInfoDto;
import com.example.projectNameBack.entity.User;
import com.example.projectNameBack.repository.UserLoginInfoRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final UserLoginInfoRepository userLoginInfoRepository;
    private final PasswordEncoder passwordEncoder;
    public AuthService(UserLoginInfoRepository userLoginInfoRepository, PasswordEncoder passwordEncoder){
        this.userLoginInfoRepository = userLoginInfoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserInfoDto login(String userID, String rawPassword){
        Optional<User> userOpt = userLoginInfoRepository.findByUserID(userID);
        if(userOpt.isPresent()){
            User user = userOpt.get();
            if(passwordEncoder.matches(rawPassword, user.getUserPassword())){
                return new UserInfoDto(user.getUserName(), user.getSession(), user.getUserYear());
            }
        }
        return null;
    }

    public User saveUserInfo(SaveUserLoginInfoDto saveUserLoginInfoDto){
        User user = new User();
        user.setUserID(saveUserLoginInfoDto.getUserID());
        user.setUserPassword(passwordEncoder.encode(saveUserLoginInfoDto.getUserPassword()));
        user.setUserName(saveUserLoginInfoDto.getUserName());
        user.setUserYear(saveUserLoginInfoDto.getUserYear());
        user.setSession(saveUserLoginInfoDto.getSession());
        user.setRole("none");
        return userLoginInfoRepository.save(user);
    }
}
