package com.qt.backend.repo;

import com.qt.backend.dto.TagDto;

import com.qt.backend.model.Tag;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface TagRepository extends JpaRepository<Tag, Long> {

    @Query("SELECT new com.qt.backend.dto.TagDto(t.post.postId, t.post.caption, t.post.mediaUrl, t.post.mediaType, t.createdAt) FROM Tag t WHERE t.user.userId = :userId")
    List<TagDto> findTaggedPostsByUserId(@Param("userId") String userId);

}
