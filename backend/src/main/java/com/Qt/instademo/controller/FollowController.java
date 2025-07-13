package com.Qt.instademo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.Qt.instademo.repository.FollowRepository;
import com.Qt.instademo.repository.DTO.FollowStatsDTO;

@RestController
@RequestMapping("/api") 
public class FollowController {

    @Autowired
    FollowRepository repo;

     @GetMapping("/follows")
      public ResponseEntity<FollowStatsDTO> getfollowsByQuery(@RequestParam("id") Long id) {
            FollowStatsDTO stats = repo.getFollowStatsByUserId(id);
            if (stats != null) {
                return ResponseEntity.ok(stats);
            } else {
                return ResponseEntity.notFound().build();
            }
      }

      @GetMapping("/follows/{id}")
      public ResponseEntity<FollowStatsDTO> getfollowsByPath(@PathVariable("id") Long id) {
            FollowStatsDTO stats = repo.getFollowStatsByUserId(id);
            if (stats != null) {
                return ResponseEntity.ok(stats);
            } else {
                return ResponseEntity.notFound().build();
            }
      }
}
