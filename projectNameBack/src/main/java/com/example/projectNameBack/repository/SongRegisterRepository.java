package com.example.projectNameBack.repository;

import com.example.projectNameBack.entity.SongRegister;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongRegisterRepository extends JpaRepository <SongRegister, Long> {
    List<SongRegister> findByEventName(String eventName);
    @Query("SELECT DISTINCT s.eventName FROM SongRegister s")
    List<String> findDistinctEventNames();
}
