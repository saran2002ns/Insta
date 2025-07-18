package com.qt.backend.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data   
@AllArgsConstructor
@NoArgsConstructor
public class TagDto {

    private Long postId;
    private String caption;
    private String mediaUrl;
    private String mediaType;
    private LocalDateTime createdAt;
}
