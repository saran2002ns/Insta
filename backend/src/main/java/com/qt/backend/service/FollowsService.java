package com.qt.backend.service;

import java.util.List;

import com.qt.backend.dto.UserDto;
import com.qt.backend.repo.FollowsRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FollowsService {
    private final FollowsRepository followsRepository;

    public List<UserDto> getFollowersByUserId(String userId) {
        return followsRepository.findFollowersByUserId(userId);
    }

    public List<UserDto> getFollowingByUserId(String userId) {
        List<UserDto> users=followsRepository.findFollowingByUserId(userId);
        for(UserDto user:users){
            user.setIsFollowed(isFollowing(userId, user.getUserId()));
        }
        return users;
       
    }

    public boolean isFollowing(String user1, String user2) {
        return followsRepository.findAnyFollowByUserIdAndFollowingId(user1, user2);
    }

}
