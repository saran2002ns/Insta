package com.qt.backend.service;

import java.util.List;

import com.qt.backend.dto.UserNameDto;
import com.qt.backend.repo.SearchRepository;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;


@Service
@RequiredArgsConstructor
public class SearchService {

    private final SearchRepository searchRepository;

    public List<UserNameDto> searchPosts(String query) {
        return searchRepository.searchPosts(query, PageRequest.of(0, 5));
    }

}
