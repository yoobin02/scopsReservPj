package com.example.projectNameBack.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SongRegister {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventName;
    private String songName;
    private String singerName;
    private String userName;

    @OneToMany(mappedBy = "songRegister", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SongSession> sessions = new ArrayList<>();
}
