package com.qt.backend.service;

import java.util.List;

import com.qt.backend.dto.UserNameDto;
import com.qt.backend.repo.FollowsRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FollowsService {
    private final FollowsRepository followsRepository;

    public List<UserNameDto> getFollowersByUserId(String userId) {
        return followsRepository.findFollowersByUserId(userId);
       
    }

    public List<UserNameDto> getFollowingByUserId(String userId) {
        return followsRepository.findFollowingByUserId(userId);
       
    }

}
