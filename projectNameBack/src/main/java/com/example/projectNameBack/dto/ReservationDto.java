package com.example.projectNameBack.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
@Builder
@Getter
@Setter
public class ReservationDto {
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private Long id;
    private String eventName;
    private String songName;
    private String singerName;
    private List<SongSessionDto> sessions;
}

