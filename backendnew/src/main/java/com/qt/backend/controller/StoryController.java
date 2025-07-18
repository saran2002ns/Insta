package com.qt.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qt.backend.dto.StoryDto;
import com.qt.backend.service.StoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/stories") 
@RequiredArgsConstructor
public class StoryController {

    private final StoryService storyService;

    @GetMapping("/{userId}")
    public List<StoryDto> getStory(@PathVariable String userId) {
        return storyService.getStoryByUserId(userId);
    }


}
