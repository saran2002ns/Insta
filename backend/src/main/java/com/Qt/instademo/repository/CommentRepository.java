package com.Qt.instademo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Qt.instademo.model.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
     List<Comment> findAllByPost_PostId(Long postId);
}
