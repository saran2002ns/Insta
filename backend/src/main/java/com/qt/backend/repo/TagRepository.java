package com.qt.backend.repo;

import com.qt.backend.dto.PostDto;
import com.qt.backend.model.Tag;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface TagRepository extends JpaRepository<Tag, Long> {

    @Query("SELECT t.post FROM Tag t WHERE t.user.userId = :userId")
    List<PostDto> findTaggedPostsByUserId(@Param("userId") String userId);

   

}
