package com.Qt.instademo.model;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Follower {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followerId;

    @ManyToOne
    @JoinColumn(name = "follower_user_id")
    private User followerUser;

    @ManyToOne
    @JoinColumn(name = "followed_user_id")
    private User followedUser;

    private LocalDateTime followedAt = LocalDateTime.now();
}

