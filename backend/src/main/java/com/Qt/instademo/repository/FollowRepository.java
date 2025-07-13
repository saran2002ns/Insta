package com.Qt.instademo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.Qt.instademo.model.Follower;
import com.Qt.instademo.repository.DTO.FollowStatsDTO;


@Repository
public interface FollowRepository extends JpaRepository<Follower, Long> {

    @Query(value = """
        SELECT 
          SUM(CASE WHEN follower_user_id = :userId THEN 1 ELSE 0 END) AS follows,
          SUM(CASE WHEN followed_user_id = :userId THEN 1 ELSE 0 END) AS followers
        FROM follower
        WHERE follower_user_id = :userId OR followed_user_id = :userId
        """, nativeQuery = true)
    FollowStatsDTO getFollowStatsByUserId(@Param("userId") Long userId);
}


