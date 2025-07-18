package com.qt.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qt.backend.dto.UserNameDto;
import com.qt.backend.service.FollowsService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/follows")
@RequiredArgsConstructor
public class FollowsController {

    private final FollowsService followsService;

    @GetMapping("/followers/{userId}")
    public ResponseEntity<?> getFollowers(@PathVariable String userId) {
        try {
            List<UserNameDto> followers = followsService.getFollowersByUserId(userId);
            return ResponseEntity.ok(followers);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @GetMapping("/following/{userId}")
    public ResponseEntity<?> getFollowing(@PathVariable String userId) {
        try {
            List<UserNameDto> following = followsService.getFollowingByUserId(userId);
            return ResponseEntity.ok(following);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
