package com.qt.backend.model;

import java.time.LocalDateTime;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "stories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storyId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "story_url")
    private String storyUrl;

    @Column(name = "story_type")
    private String storyType;

    @Column(name = "caption")
    private String caption;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}

