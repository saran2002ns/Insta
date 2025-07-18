package com.qt.backend.service;

import java.util.List;


import com.qt.backend.dto.TagDto;

import com.qt.backend.repo.TagRepository;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;

    public List<TagDto> getTaggedPostsByUserId(String userId) {
        return tagRepository.findTaggedPostsByUserId(userId);
    }
 

}
