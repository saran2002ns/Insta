package com.Qt.instademo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Qt.instademo.model.User;

public interface UserRepo extends JpaRepository<User, Long>{

}
