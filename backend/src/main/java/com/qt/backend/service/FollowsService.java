package com.qt.backend.service;

import java.util.List;

import com.qt.backend.dto.UserDto;
import com.qt.backend.model.Follows;
import com.qt.backend.repo.FollowsRepository;
import com.qt.backend.repo.PostRepository;
import com.qt.backend.repo.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FollowsService {
    private final FollowsRepository followsRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public List<UserDto> getFollowersByUserId(String userId) {
        List<UserDto> users = followsRepository.findFollowersByUserId(userId);
        for (UserDto user : users) {
            user.setIsFollowed(isFollowing(userId, user.getUserId()));
            user.setPosts(postRepository.countPostsByUserId(user.getUserId()));
            user.setFollowers(followsRepository.countFollowersByUserId(user.getUserId()));
            user.setFollowing(followsRepository.countFollowingByUserId(user.getUserId()));
        }
        return users;
    }

    public List<UserDto> getFollowingByUserId(String userId) {
        List<UserDto> users = followsRepository.findFollowingByUserId(userId);
        for (UserDto user : users) {
            user.setIsFollowed(true);
            user.setFollowers(followsRepository.countFollowersByUserId(user.getUserId()));
            user.setFollowing(followsRepository.countFollowingByUserId(user.getUserId()));
        }

        return users;

    }

    public boolean isFollowing(String user1, String user2) {
        return followsRepository.findAnyFollowByUserIdAndFollowingId(user1, user2);
    }

    public void followUser(String userId, String loggedInUserId) {
        if (isFollowing(loggedInUserId, userId)) {
            throw new RuntimeException("User already followed");
        }
        Follows follow = new Follows();
        follow.setFollower(userRepository.findByUserId(loggedInUserId));
        follow.setFollowing(userRepository.findByUserId(userId));
        followsRepository.save(follow);
    }

    public void unfollowUser(String userId, String loggedInUserId) {
        Follows follow = followsRepository.findByFollowerIdAndFollowingId(loggedInUserId, userId);
        if (follow == null) {
            throw new RuntimeException("Follow relationship not found");
        }
        followsRepository.delete(follow);
    }

}
