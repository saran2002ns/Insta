package com.qt.backend.repo;

import java.util.List;

import com.qt.backend.dto.NotificationDto;
import com.qt.backend.model.Notification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("SELECT new com.qt.backend.dto.NotificationDto(n.id, n.byUser.profilePicture , n.byUser.userId, n.byUser.username,n.byUser.bio,n.byUser.isPrivate, n.type, n.createdAt) "
    + "FROM Notification n "
    + "WHERE n.user.userId = :userId")
    List<NotificationDto> findByUser(String userId);

}
