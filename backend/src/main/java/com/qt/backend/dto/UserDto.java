package com.qt.backend.dto;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class UserDto {
    private String userId;
    private String profilePicture;
    private String username;
    private boolean isPrivate;
    private boolean isFollowed;

    public UserDto(String userId, String profilePicture, String username, boolean isPrivate) {
        this.userId = userId;
        this.profilePicture = profilePicture;
        this.username = username;
        this.isPrivate = isPrivate;
    }

    public UserDto(String userId, String profilePicture, String username, boolean isPrivate, boolean isFollowed) {
        this.userId = userId;
        this.profilePicture = profilePicture;
        this.username = username;
        this.isPrivate = isPrivate;
        this.isFollowed = isFollowed;
    }

    public void setIsFollowed(boolean isFollowed) {
        this.isFollowed = isFollowed;
    }
}
