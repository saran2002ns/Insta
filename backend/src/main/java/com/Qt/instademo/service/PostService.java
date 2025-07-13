package com.Qt.instademo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Qt.instademo.model.Comment;
import com.Qt.instademo.model.Like;
import com.Qt.instademo.model.Post;
import com.Qt.instademo.model.SavedPost;
import com.Qt.instademo.repository.CommentRepository;
import com.Qt.instademo.repository.LikeRepository;
import com.Qt.instademo.repository.PostRepository;
import com.Qt.instademo.repository.SavedPostRepository;
import com.Qt.instademo.repository.DTO.PostStatusDTO;

@Service
public class PostService {

    @Autowired
    PostRepository postRepo;

    @Autowired
    private LikeRepository likeRepo;

    @Autowired
    private CommentRepository commentRepo;

    @Autowired
    private SavedPostRepository savedPostRepo;

    public PostStatusDTO getPostStatus(Long postId) {
        Post post =postRepo.findById(postId).orElse(null);
        List<Like> likes = likeRepo.findAllByPost_PostId(postId);
        List<Comment> comments = commentRepo.findAllByPost_PostId(postId);
        List<SavedPost> savedPosts = savedPostRepo.findAllByPost_PostId(postId);
        return new PostStatusDTO(post,likes, comments, savedPosts);
    }

    public List<PostStatusDTO> getPostsStatus(Long userId) {
        List<Long> postIds = postRepo.findAllPostIdsByUserId(userId);
        List<PostStatusDTO> postServicesList = new ArrayList<>();
        for(Long postId: postIds){
            try {
                postServicesList.add(getPostStatus(postId));
            } catch (Exception e) {
               System.out.println("List : "+e);
            }
            
        }      
        return postServicesList;
    }
}
