package com.qt.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.qt.backend.dto.StoryDto;
import com.qt.backend.repo.FollowsRepository;
import com.qt.backend.repo.StoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StoryService {
    private final StoryRepository storyRepository;
    private final FollowsRepository followsRepository;

    public List<StoryDto> getStoryByUserId(String viewerId) {
        List<String> userIds = followsRepository.findFollowingNamesByUserId(viewerId);
        userIds.add(viewerId);
        return storyRepository.findByUserIdInWithViewStatus(userIds, viewerId);
    }
}
