package com.qt.backend.repo;

import com.qt.backend.model.Save;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaveRepository extends JpaRepository<Save, Long> {
    @Query("SELECT s FROM Save s WHERE s.post.postId = :postId")
    List<Save> findByPostId(@Param("postId") Long postId);

    @Query("SELECT COUNT(s) > 0 FROM Save s WHERE s.post.postId = :postId AND s.user.userId = :userId")
    boolean findAnySaveByPostIdAndUserId(@Param("postId") Long postId, @Param("userId") Long userId);
} 