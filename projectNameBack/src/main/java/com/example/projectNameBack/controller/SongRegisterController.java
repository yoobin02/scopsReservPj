package com.example.projectNameBack.controller;

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
            // 예외 처리 (간단히 로그 출력 및 500 에러 응답)
            e.printStackTrace();
            return new ResponseEntity<>("곡 등록 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/by-event")
    public List<SongRegisterDto> getSongsByEvent(@RequestParam String eventName) {
        return songRegisterService.getSongsByEvent(eventName);
    }

}
