package com.qt.backend.service;

import java.util.List;

import com.qt.backend.dto.UserDto;
import com.qt.backend.repo.FollowsRepository;
import com.qt.backend.repo.PostRepository;
import com.qt.backend.repo.SearchRepository;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;


@Service
@RequiredArgsConstructor
public class SearchService {

    private final SearchRepository searchRepository;
    private final FollowsService followsService;
    private final FollowsRepository followsRepository;
    private final PostRepository postRepository;

    public List<UserDto> searchPosts(String query, String userId) {
        List<UserDto> users = searchRepository.searchPosts(query, PageRequest.of(0, 5));
        for (UserDto user : users) {
            user.setIsFollowed(followsService.isFollowing(userId, user.getUserId()));
            user.setPosts(postRepository.countPostsByUserId(user.getUserId()));
            user.setFollowers(followsRepository.countFollowersByUserId(user.getUserId()));
            user.setFollowing(followsRepository.countFollowingByUserId(user.getUserId()));
        }
        return users;
    }

}
