package com.qt.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qt.backend.dto.PostDto;
import com.qt.backend.service.TagService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/api/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    @GetMapping("/{postId}")
    public ResponseEntity<?> getTagsByPostId(@PathVariable String userId) {
        try {
            List<PostDto> tags = tagService.getTaggedPostsByUserId(userId);
            return ResponseEntity.ok(tags);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
