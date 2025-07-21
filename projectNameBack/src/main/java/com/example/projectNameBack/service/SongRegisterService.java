package com.example.projectNameBack.service;

import com.example.projectNameBack.dto.SongRegisterDto;
import com.example.projectNameBack.dto.SongSessionDto;
import com.example.projectNameBack.entity.SongRegister;
import com.example.projectNameBack.entity.SongSession;
import com.example.projectNameBack.repository.SongRegisterRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SongRegisterService {

    private final SongRegisterRepository songRegisterRepository;

    public SongRegisterService(SongRegisterRepository songRegisterRepository) {
        this.songRegisterRepository = songRegisterRepository;
    }

    @Transactional
    public SongRegister saveSongRegister(SongRegisterDto dto) {
        SongRegister songRegister = new SongRegister();
        songRegister.setEventName(dto.getEventName());
        songRegister.setSongName(dto.getSongName());
        songRegister.setSingerName(dto.getSingerName());
        songRegister.setUserName(dto.getUserName());

        // 세션 엔티티 리스트 만들기
        for (SongSessionDto sessionDto : dto.getSessions()) {
            SongSession session = new SongSession();
            session.setSessionType(sessionDto.getSessionType());
            session.setPlayerName(sessionDto.getPlayerName());
            session.setSongRegister(songRegister);  // 연관관계 설정

            songRegister.getSessions().add(session);
        }

        return songRegisterRepository.save(songRegister);
    }

    public List<SongRegisterDto> getSongsByEvent(String eventName) {
        List<SongRegister> songRegisters = songRegisterRepository.findByEventName(eventName);

        return songRegisters.stream()
                .map(songRegister -> {
                    SongRegisterDto dto = new SongRegisterDto();
                    dto.setId(songRegister.getId());
                    dto.setEventName(songRegister.getEventName());
                    dto.setSongName(songRegister.getSongName());
                    dto.setSingerName(songRegister.getSingerName());
                    dto.setUserName(songRegister.getUserName());
                    dto.setSessions(
                            songRegister.getSessions().stream()
                                    .map(session -> {
                                        SongSessionDto sessionDto = new SongSessionDto();
                                        sessionDto.setSessionType(session.getSessionType());
                                        sessionDto.setPlayerName(session.getPlayerName());
                                        return sessionDto;
                                    }).collect(Collectors.toList())
                    );
                    return dto;
                }).collect(Collectors.toList());
    }
}
