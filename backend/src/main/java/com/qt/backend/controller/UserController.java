package com.qt.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.qt.backend.dto.UserDto;
import com.qt.backend.dto.UserPasswordCheckDto;
import com.qt.backend.dto.UserProfileDto;

import com.qt.backend.service.UserService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUser(@PathVariable String userId,@RequestParam String loggedInUserId ) {
        try {
            UserProfileDto user = userService.getUserById(userId,loggedInUserId);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @GetMapping("/{userId}/suggestions")
    public ResponseEntity<?> getUserSuggestions(@PathVariable String userId) {
        try {
            List<UserDto> suggestions = userService.getUserSuggestions(userId);
            return ResponseEntity.ok(suggestions);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public boolean checkPassword(@RequestBody UserPasswordCheckDto userPasswordCheckDto) {
        return userService.checkPassword(userPasswordCheckDto);
    }

}
