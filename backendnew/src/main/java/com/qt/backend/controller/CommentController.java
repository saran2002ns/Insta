package com.qt.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qt.backend.dto.CommentDto;
import com.qt.backend.service.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/{postId}")
    public List<CommentDto> getCommentsByPostId(@PathVariable Long postId) {
        return commentService.getCommentsByPostId(postId);
    }

}
