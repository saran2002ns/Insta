package com.qt.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data   
public class UserProfileDto {
    private String userId;
    private String profilePicture;
    private String username;
    private String bio;
    private boolean isPrivate;
    private boolean isFollowed;
    private Long totalPosts;
    private Long totalFollowers;
    private Long totalFollowing;

    public UserProfileDto(String userId, String profilePicture, String username, String bio, boolean isPrivate){
        this.userId = userId;
        this.profilePicture = profilePicture;
        this.username = username;
        this.bio = bio;
        this.isPrivate = isPrivate; 
    }

    public void setIsFollowed(boolean isFollowed) {
        this.isFollowed = isFollowed;
    }

    
}
