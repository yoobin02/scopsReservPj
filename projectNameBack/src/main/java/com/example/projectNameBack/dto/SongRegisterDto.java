package com.example.projectNameBack.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SongRegisterDto {
    private Long id;
    private String eventName;
    private String songName;
    private String singerName;
    private String userName;
    private List<SongSessionDto> sessions;
}