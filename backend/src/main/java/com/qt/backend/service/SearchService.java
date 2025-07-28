package com.qt.backend.service;

import java.util.List;

import com.qt.backend.dto.UserDto;
import com.qt.backend.repo.FollowsRepository;
import com.qt.backend.repo.PostRepository;
import com.qt.backend.repo.SearchRepository;
import com.qt.backend.repo.RequestRepository;

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
    private final RequestRepository requestRepository;

    public List<UserDto> searchPosts(String query, String userId) {
        List<UserDto> users = searchRepository.searchPosts(query, PageRequest.of(0, 5),userId);
        for (UserDto user : users) {
            user.setIsFollowed(followsService.isFollowing(userId, user.getUserId()));
            user.setPosts(postRepository.countPostsByUserId(user.getUserId()));
            user.setFollowers(followsRepository.countFollowersByUserId(user.getUserId()));
            user.setFollowing(followsRepository.countFollowingByUserId(user.getUserId()));
            if(!user.isFollowed() && user.isPrivate()){
                user.setIsRequested(requestRepository.findByUserAndByUser(user.getUserId(), userId).isPresent());
            }else{
                user.setIsRequested(false);
            }
        }
        return users;
    }

}
