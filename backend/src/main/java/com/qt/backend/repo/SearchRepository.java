package com.qt.backend.repo;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.qt.backend.dto.UserNameDto;
import com.qt.backend.model.User;

public interface SearchRepository extends JpaRepository<User, String> {

    @Query("SELECT new com.qt.backend.dto.UserNameDto(u.userId, u.profilePicture, u.username) "
    + "FROM User u "
    + "WHERE u.username LIKE %:query% OR u.userId LIKE %:query%")
    List<UserNameDto> searchPosts(String query);

    List<UserNameDto> searchPosts(String query, PageRequest of);
    

}
