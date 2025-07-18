package com.qt.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    private Long postId;
    private String mediaUrl;
    private String mediaType;
    private String caption;
    private LocalDateTime createdAt;
    private Long likes;
    private Long comments;
    private boolean isLiked;
    private boolean isSaved;
    private String userId;
    private String profilePicture;

    public void setIsLiked(boolean isLiked) {
        this.isLiked = isLiked;
    }
    public void setIsSaved(boolean isSaved) {
        this.isSaved = isSaved;
    }
}

