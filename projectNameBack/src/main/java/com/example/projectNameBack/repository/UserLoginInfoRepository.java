package com.example.projectNameBack.repository;

import com.example.projectNameBack.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLoginInfoRepository extends JpaRepository<User, Long> {
}
