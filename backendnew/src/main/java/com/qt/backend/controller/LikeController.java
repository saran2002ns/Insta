package com.qt.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qt.backend.dto.LikeDto;
import com.qt.backend.service.LikeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/likes")   
@RequiredArgsConstructor
public class LikeController {
    
    private final LikeService likeService;

    @GetMapping("/{postId}")
    public List<LikeDto> getLikesByPostId(@PathVariable Long postId) {
        return likeService.getLikesByPostId(postId);
    }
    
    
}
