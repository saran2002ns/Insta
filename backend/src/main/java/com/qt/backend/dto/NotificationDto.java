package com.qt.backend.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDto {

    private Long id;
    private UserDto user;
    private String type;
    private LocalDateTime createdAt;

    public NotificationDto(Long id, String profilePicture, String userId, String username,String bio,boolean isPrivate, String type, java.time.LocalDateTime createdAt) {
        this.id = id;
        this.user = new UserDto(userId, profilePicture, username,bio,isPrivate);
        this.type = type;
        this.createdAt = createdAt;
    }
}
