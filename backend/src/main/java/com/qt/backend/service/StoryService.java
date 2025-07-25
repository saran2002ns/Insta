package com.qt.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.qt.backend.dto.StoryDto;
import com.qt.backend.model.Story;
import com.qt.backend.model.StoryView;
import com.qt.backend.repo.FollowsRepository;
import com.qt.backend.repo.StoryRepository;
import com.qt.backend.repo.StoryViewRepository;
import com.qt.backend.repo.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StoryService {
    private final StoryRepository storyRepository;
    private final FollowsRepository followsRepository;
    private final UserRepository userRepository;
    private final StoryViewRepository storyViewRepository;

    public List<StoryDto> getStoryByUserId(String viewerId) {
        List<String> userIds = followsRepository.findFollowingNamesByUserId(viewerId);
        userIds.add(viewerId);
        return storyRepository.findByUserIdInWithViewStatus(userIds, viewerId);
    }

    public void viewStory(Long storyId, String userId) {
       Story story = storyRepository.findById(storyId).orElseThrow(() -> new RuntimeException("Story not found"));
       StoryView storyView = new StoryView();
       storyView.setStory(story);
       storyView.setUser(userRepository.findByUserId(userId));
       storyViewRepository.save(storyView);
    }
}
