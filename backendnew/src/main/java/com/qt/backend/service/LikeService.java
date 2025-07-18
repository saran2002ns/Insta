package com.qt.backend.service;

import java.util.List;

import com.qt.backend.dto.LikeDto;
import com.qt.backend.repo.LikeRepository;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    public List<LikeDto> getLikesByPostId(Long postId) {
        return likeRepository.findByPostId(postId);
    }

}
