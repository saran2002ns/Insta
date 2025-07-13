package com.Qt.instademo.repository;

import com.Qt.instademo.model.SavedPost;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavedPostRepository  extends JpaRepository<SavedPost, Long> {
     List<SavedPost> findAllByPost_PostId(Long postId);
}
