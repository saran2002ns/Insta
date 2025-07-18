package com.qt.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.qt.backend.dto.PostDto;
import com.qt.backend.service.PostService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    // Example for a single post
    // @GetMapping("/{postId}/user/{userId}")
    // public ResponseEntity<PostDto> getPostByIdAndUserId(@PathVariable Long
    // postId, @PathVariable Long userId) {
    // PostDto post = postService.getPostByIdAndUserId(postId, userId);
    // if (post == null) {
    // return ResponseEntity.notFound().build();
    // }
    // return ResponseEntity.ok(post);
    // }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getPostsByUserId(@PathVariable String userId) {
        try {
            List<PostDto> posts = postService.getPostsByUserId(userId);
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @GetMapping("/feed/{userId}")
    public ResponseEntity<?> getFeedPostsForUser(
            @PathVariable String userId,
            @RequestParam(defaultValue = "0") int page) {
        try {
            List<PostDto> posts = postService.getFeedPostsForUser(userId, page);
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @GetMapping("/reels/{userId}")
    public ResponseEntity<?> getReelsPostsForUser(
            @PathVariable String userId,
            @RequestParam(defaultValue = "0") int page) {
        try {
            List<PostDto> posts = postService.getReelsPostsForUser(userId, page);
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
