package com.example.projectNameBack.controller;

import com.example.projectNameBack.dto.ReservationRequestDto;
import com.example.projectNameBack.dto.SongRegisterDto;
import com.example.projectNameBack.entity.SongRegister;
import com.example.projectNameBack.service.SongRegisterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/songs")
public class SongRegisterController {

    private final SongRegisterService songRegisterService;

    public SongRegisterController(SongRegisterService songRegisterService) {
        this.songRegisterService = songRegisterService;
    }

    @PostMapping
    public ResponseEntity<?> registerSong(@RequestBody SongRegisterDto dto) {
        try {
            SongRegister saved = songRegisterService.saveSongRegister(dto);
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("곡 등록 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 이벤트 이름으로 곡 조회
    @GetMapping("/by-event")
    public List<SongRegisterDto> getSongsByEvent(@RequestParam String eventName) {
        return songRegisterService.getSongsByEvent(eventName);
    }

    // 등록된 이벤트 이름만 가져오기
    @GetMapping("/events")
    public List<String> getEventNames() {
        return songRegisterService.getEventNames();
    }

    // 곡 예약
    @PostMapping("/reservation")
    public ResponseEntity<?> reservationSong(@RequestBody ReservationRequestDto requestDto) {
        try {
            songRegisterService.reserveSong(requestDto);
            return ResponseEntity.ok("예약이 완료되었습니다.");
        } catch (Exception e) {
            return new ResponseEntity<>("예약 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
