package com.qt.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import com.qt.backend.dto.CommentDto;
// import com.qt.backend.dto.CommentDto;
// import com.qt.backend.model.Comment;
import com.qt.backend.repo.CommentRepository;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    public List<CommentDto> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId);

    }

}
