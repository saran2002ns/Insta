package com.qt.backend.repo;

import com.qt.backend.dto.PostDto;
import com.qt.backend.model.Save;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface SaveRepository extends JpaRepository<Save, Long> {
    
    @Query("SELECT COUNT(s) > 0 FROM Save s WHERE s.post.postId = :postId AND s.user.userId = :userId")
    boolean findAnySaveByPostIdAndUserId(@Param("postId") Long postId, @Param("userId") String userId);

    @Query("SELECT new com.qt.backend.dto.PostDto(p.postId, p.mediaUrl, p.mediaType, p.caption, p.createdAt, p.user.userId, p.user.profilePicture, p.user.username, p.user.isPrivate) "
                        +
                        "FROM Post p " +
                        "WHERE p.postId IN (SELECT s.post.postId FROM Save s WHERE s.user.userId = :userId)")
    List<PostDto> findSavedPostsByUserId(String userId);
} 