package com.qt.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qt.backend.dto.UserNameDto;
import com.qt.backend.service.FollowsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/follows")
@RequiredArgsConstructor
public class FollowsController {

    private final FollowsService followsService;

    @GetMapping("/followers/{userId}")
    public List<UserNameDto> getFollowers(@PathVariable String userId) {
        return followsService.getFollowersByUserId(userId);
    }

    @GetMapping("/following/{userId}")
    public List<UserNameDto> getFollowing(@PathVariable String userId) {
        return followsService.getFollowingByUserId(userId);
    }
}
