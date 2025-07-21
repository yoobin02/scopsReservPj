package com.example.projectNameBack.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SongSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sessionType;  // 예: V, B, D
    private String playerName;   // 이름

    @ManyToOne
    @JoinColumn(name = "song_register_id")
    private SongRegister songRegister;
}
