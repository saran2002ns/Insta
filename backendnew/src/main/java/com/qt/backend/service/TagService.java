package com.qt.backend.service;

import java.util.List;

import com.qt.backend.dto.PostDto;

import com.qt.backend.repo.TagRepository;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;

  


    public List<PostDto> getTaggedPostsByUserId(String userId) {
        return tagRepository.findTaggedPostsByUserId(userId);
    }

   

    

}
