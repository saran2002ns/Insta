package com.qt.backend.service;

import com.qt.backend.dto.UserDto;
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
        userProfileDto.setPosts(postRepository.countPostsByUserId(userId));
        userProfileDto.setFollowers(followsRepository.countFollowersByUserId(userId));
        userProfileDto.setFollowing(followsRepository.countFollowingByUserId(userId));
        return userProfileDto;
       
    }

    public UserDto checkPassword(UserPasswordCheckDto userPasswordCheckDto) {

        UserDto user = userRepository.findByUserIdAndPassword(userPasswordCheckDto.getUserId(), userPasswordCheckDto.getPassword());
        if(user == null)
            return null;
        else{
            user.setIsFollowed(true);
            user.setPosts(postRepository.countPostsByUserId(user.getUserId()));
            user.setFollowers(followsRepository.countFollowersByUserId(user.getUserId()));
            user.setFollowing(followsRepository.countFollowingByUserId(user.getUserId()));
        }
        return user;

    }

    

    public List<UserDto> getUserSuggestions(String userId) {
        List<UserDto> users = userRepository.findUsersNotFollowedBy(userId, PageRequest.of(0, 10));
        for(UserDto user:users){
            user.setIsFollowed(followsRepository.findAnyFollowByUserIdAndFollowingId(userId, user.getUserId()));
            user.setPosts(postRepository.countPostsByUserId(user.getUserId()));
            user.setFollowers(followsRepository.countFollowersByUserId(user.getUserId()));
            user.setFollowing(followsRepository.countFollowingByUserId(user.getUserId()));
        }
        return users;
    }

}
