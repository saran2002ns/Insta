package com.qt.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.qt.backend.model.StoryView;

@Repository
public interface StoryViewRepository extends JpaRepository<StoryView, Long> {

}
