package com.example.projectNameBack.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity @Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userName;
    private String songName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String eventName;

    public Reservation(String userName, String songName, LocalDateTime startTime, LocalDateTime endTime, String eventName) {
        this.userName = userName;
        this.songName = songName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.eventName = eventName;
    }
}
