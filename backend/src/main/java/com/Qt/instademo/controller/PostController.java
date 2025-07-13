package com.Qt.instademo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import com.Qt.instademo.repository.PostRepository;
import com.Qt.instademo.repository.DTO.PostStatusDTO;
import com.Qt.instademo.service.PostService;

@RestController
@RequestMapping("/api") 
public class PostController {
    
    @Autowired
    PostRepository repo;

    @Autowired
    PostService service;

    
//     @GetMapping("/posts")
//     public ResponseEntity<List<Post>> getPostsByQuery(@RequestParam("id") Long userId){
//         return ResponseEntity.ok(repo.findAllByUser_UserId(userId));
//     }

//    @GetMapping("/posts/{id}")
//     public ResponseEntity<List<Post>> getPostsByPath(@PathVariable("id") Long userId) {
//         return ResponseEntity.ok(repo.findAllByUser_UserId(userId));
    // }

    @GetMapping("/post/{id}")
     public ResponseEntity<PostStatusDTO> getPostByPath(@PathVariable("id") Long postId) {
        return ResponseEntity.ok(service.getPostStatus(postId));
    }
    @GetMapping("/post")
     public ResponseEntity<PostStatusDTO> getPostByQuery(@RequestParam("id") Long postId) {
        return ResponseEntity.ok(service.getPostStatus(postId));
    }

   @GetMapping("/posts/{id}")
     public ResponseEntity<List<PostStatusDTO>> getPostsByPath(@PathVariable("id") Long postId) {
        return ResponseEntity.ok(service.getPostsStatus(postId));
    }
    @GetMapping("/posts")
     public ResponseEntity<List<PostStatusDTO>> getPostsByQuery(@RequestParam("id") Long postId) {
        return ResponseEntity.ok(service.getPostsStatus(postId));
    }

}
