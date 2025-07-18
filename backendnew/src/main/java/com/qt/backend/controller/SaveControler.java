package com.qt.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qt.backend.dto.PostDto;
import com.qt.backend.service.SaveService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/saves")
@RequiredArgsConstructor
public class SaveControler {

    private final SaveService saveService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getSavesByUserId(@PathVariable String userId) {
        try {
            List<PostDto> saves = saveService.getSavedPosts(userId);
            return ResponseEntity.ok(saves);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
