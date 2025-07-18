package com.qt.backend.service;

import com.qt.backend.dto.UserPasswordCheckDto;
import com.qt.backend.model.User;
import com.qt.backend.repo.UserRepository;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getUserById(String userId) {
        return userRepository.findByUserId(userId);
    }

    public boolean checkPassword(UserPasswordCheckDto userPasswordCheckDto) {

       
            User user = userRepository.findByUserId(userPasswordCheckDto.getUserId());
            return user.getPassword().equals(userPasswordCheckDto.getPassword());
      
      
      
    }

}
