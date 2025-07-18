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

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    // @GetMapping("/{postId}/user/{userId}")
    // public PostDto getPostByIdAndUserId(@PathVariable Long postId, @PathVariable Long userId) {
    //     return postService.getPostByIdAndUserId(postId, userId);
    // }

    @GetMapping("/{userId}")
    public List<PostDto> getPostsByUserId(@PathVariable Long userId) {
        return postService.getPostsByUserId(userId);
    }

    @GetMapping("/feed/{userId}")
    public List<PostDto> getFeedPostsForUser( @PathVariable Long userId, @RequestParam(defaultValue = "0") int page ) {
        return postService.getFeedPostsForUser(userId, page);
    }
    @GetMapping("/reels/{userId}")
    public List<PostDto> getReelsPostsForUser( @PathVariable Long userId, @RequestParam(defaultValue = "0") int page ) {
        return postService.getReelsPostsForUser(userId, page);
    }
}
