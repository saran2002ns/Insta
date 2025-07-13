package com.Qt.instademo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Qt.instademo.model.Like;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findAllByPost_PostId(Long postId);
}

