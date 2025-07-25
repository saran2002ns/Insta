package com.qt.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.qt.backend.dto.StoryDto;
import com.qt.backend.service.StoryService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/stories")
@RequiredArgsConstructor
public class StoryController {

    private final StoryService storyService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getStory(@PathVariable String userId) {
        try {
            List<StoryDto> stories = storyService.getStoryByUserId(userId);
            return ResponseEntity.ok(stories);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(java.util.Map.of("error", e.getMessage()));
        }
    }
    @PostMapping("/{storyId}/view")
    public ResponseEntity<?> viewStory(@PathVariable Long storyId,@RequestParam String loggedInUserId) {
        try {
            storyService.viewStory(storyId, loggedInUserId);
            return ResponseEntity.ok(java.util.Map.of("message", "Story viewed successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(java.util.Map.of("error", e.getMessage()));
        }
    }
}
