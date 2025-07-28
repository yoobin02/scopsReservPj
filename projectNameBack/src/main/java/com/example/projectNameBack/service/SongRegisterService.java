package com.example.projectNameBack.service;

import com.example.projectNameBack.dto.ReservationRequestDto;
import com.example.projectNameBack.dto.SongRegisterDto;
import com.example.projectNameBack.dto.SongSessionDto;
import com.example.projectNameBack.entity.Reservation;
import com.example.projectNameBack.entity.SongRegister;
import com.example.projectNameBack.entity.SongSession;
import com.example.projectNameBack.repository.ReservationRepository;
import com.example.projectNameBack.repository.SongRegisterRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SongRegisterService {

    private final SongRegisterRepository songRegisterRepository;
    private final ReservationRepository reservationRepository;

    public SongRegisterService(SongRegisterRepository songRegisterRepository, ReservationRepository reservationRepository) {
        this.songRegisterRepository = songRegisterRepository;
        this.reservationRepository = reservationRepository;
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
    public List<String> getEventNames() {
        return songRegisterRepository.findDistinctEventNames();
    }
    public List<SongRegister> findSongsByEventName(String eventName) {
        return songRegisterRepository.findByEventName(eventName);
    }
    public List<SongRegister> findSingerNameBySongName(String songName) {
        return songRegisterRepository.findByEventName(songName);
    }
    public void reserveSong(ReservationRequestDto dto) {
        System.out.println("=== 예약 요청 DTO 확인 ===");
        System.out.println("eventName = " + dto.getEventName());
        System.out.println("singer = " + dto.getSingerName());
        System.out.println("title = " + dto.getSongName());
        System.out.println("date = " + dto.getDate());
        System.out.println("startTime = " + dto.getStartTime());
        System.out.println("endTime = " + dto.getEndTime());
        Reservation reservation = new Reservation();
        reservation.setEventName(dto.getEventName());
        reservation.setSingerName(dto.getSingerName());
        reservation.setSongName(dto.getSongName());
        reservation.setDate(dto.getDate());          // 날짜는 date 필드에 설정
        reservation.setStartTime(dto.getStartTime().withSecond(0).withNano(0));
        reservation.setEndTime(dto.getEndTime().withSecond(0).withNano(0));

        reservationRepository.save(reservation);
    }
}
