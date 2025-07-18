package com.qt.backend.service;

import java.util.List;

import com.qt.backend.dto.PostDto;
import com.qt.backend.repo.SaveRepository;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SaveService {

    private final SaveRepository saveRepository;

    public List<PostDto> getSavedPosts(String userId) {
        return saveRepository.findSavedPostsByUserId(userId);
    }

}
