package com.example.projectNameBack.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity @Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String userID;
    private String userPassword;
    private String userName;
    private String session;
    private String role;
    private int userYear;

    public User(String userName, int userYear, String session, String userID, String userPassword, String role) {
        this.userName = userName;
        this.userYear = userYear;
        this.session = session;
        this.userID = userID;
        this.userPassword = userPassword;
        this.role = role;
    }
}
