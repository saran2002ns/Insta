package com.qt.backend.service;

import com.qt.backend.dto.UserDto;
import com.qt.backend.dto.UserNameDto;
import com.qt.backend.dto.UserPasswordCheckDto;
import com.qt.backend.dto.UserProfileDto;
import com.qt.backend.model.User;
import com.qt.backend.repo.FollowsRepository;
import com.qt.backend.repo.PostRepository;
import com.qt.backend.repo.UserRepository;

import java.util.List;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final FollowsRepository followsRepository;
    private final PostRepository postRepository;
    public UserProfileDto getUserById(String userId,String userId2) {
        User user = userRepository.findByUserId(userId);
        UserProfileDto userProfileDto = new UserProfileDto(user.getUserId(), user.getProfilePicture(), user.getUsername(), user.getBio(), user.isPrivate());
        if(!userId.equals(userId2))
        userProfileDto.setIsFollowed(followsRepository.findAnyFollowByUserIdAndFollowingId(userId, userId2));
        else
        userProfileDto.setIsFollowed(true);

        userProfileDto.setTotalPosts(postRepository.countPostsByUserId(userId));
        userProfileDto.setTotalFollowers(followsRepository.countFollowersByUserId(userId));
        userProfileDto.setTotalFollowing(followsRepository.countFollowingByUserId(userId));
        return userProfileDto;
       
    }

    public boolean checkPassword(UserPasswordCheckDto userPasswordCheckDto) {

        User user = userRepository.findByUserId(userPasswordCheckDto.getUserId());
        return user.getPassword().equals(userPasswordCheckDto.getPassword());

    }

    

    public List<UserDto> getUserSuggestions(String userId) {
        List<UserDto> users = userRepository.findUsersNotFollowedBy(userId, PageRequest.of(0, 10));
        return users;
    }

}
