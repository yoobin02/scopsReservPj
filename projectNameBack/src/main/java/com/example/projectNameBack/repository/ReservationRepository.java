package com.example.projectNameBack.repository;

import com.example.projectNameBack.dto.ReservationDto;
import com.example.projectNameBack.entity.Reservation;
import com.example.projectNameBack.entity.SongRegister;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query("SELECT r FROM Reservation r JOIN FETCH r.songRegister sr JOIN FETCH sr.sessions WHERE r.date = :date")
    List<Reservation> findWithSessionsByDate(@Param("date") LocalDate date);
}
