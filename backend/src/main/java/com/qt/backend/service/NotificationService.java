package com.qt.backend.service;

import java.util.List;

import com.qt.backend.dto.NotificationDto;
import com.qt.backend.repo.FollowsRepository;
import com.qt.backend.repo.NotificationRepository;
import com.qt.backend.repo.PostRepository;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationService {


    private final NotificationRepository notificationRepository;
    private final FollowsRepository followsRepository;
    private final PostRepository postRepository;

    public List<NotificationDto> getNotifications(String userId) {
        List<NotificationDto> notifications = notificationRepository.findByUser(userId);
        for (NotificationDto notificationDto : notifications) {
            notificationDto.getUser().setIsFollowed(followsRepository.findAnyFollowByUserIdAndFollowingId(userId, notificationDto.getUser().getUserId()));
            notificationDto.getUser().setPosts(postRepository.countPostsByUserId(notificationDto.getUser().getUserId()));
            notificationDto.getUser().setFollowers(followsRepository.countFollowersByUserId(notificationDto.getUser().getUserId()));
            notificationDto.getUser().setFollowing(followsRepository.countFollowingByUserId(notificationDto.getUser().getUserId()));
        }
        return notifications;
    }

}
