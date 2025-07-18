package com.qt.backend.service;

import com.qt.backend.dto.UserDto;
import com.qt.backend.dto.UserNameDto;
import com.qt.backend.dto.UserPasswordCheckDto;
import com.qt.backend.model.User;
import com.qt.backend.repo.UserRepository;

import java.util.List;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final FollowsService followsService;

    public User getUserById(String userId) {
        return userRepository.findByUserId(userId);
    }

    public boolean checkPassword(UserPasswordCheckDto userPasswordCheckDto) {

        User user = userRepository.findByUserId(userPasswordCheckDto.getUserId());
        return user.getPassword().equals(userPasswordCheckDto.getPassword());

    }

    public List<UserDto> getUserSuggestions(String userId) {
        List<UserDto> users = userRepository.findUsersNotFollowedBy(userId, PageRequest.of(0, 10));
        for (UserDto user : users) {
            user.setIsFollowed(followsService.isFollowing(userId, user.getUserId()));
        }
        return users;
    }

}
