package com.qt.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity 
@Table(name="users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "user_name", nullable = false)
    private String username;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "bio")
    private String bio;

    @Column(name = "is_private")
    private boolean isPrivate;

    @Column(name = "profile_picture")
    private String profilePicture;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

}
