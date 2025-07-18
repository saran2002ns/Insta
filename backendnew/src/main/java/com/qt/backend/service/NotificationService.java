package com.qt.backend.service;

import java.util.List;

import com.qt.backend.dto.NotificationDto;
import com.qt.backend.repo.NotificationRepository;


import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationService {


    private final NotificationRepository notificationRepository;

    public List<NotificationDto> getNotifications(String userId) {
        List<NotificationDto> notifications = notificationRepository.findByUser(userId);
        return notifications;
    }

}
