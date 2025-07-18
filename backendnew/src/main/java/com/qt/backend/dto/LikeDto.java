package com.qt.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LikeDto {
    private Long likeId;
    private UserNameDto user;
    private LocalDateTime likeTime;
}
