package com.qt.backend.service;

import java.util.List;

import com.qt.backend.dto.PostDto;
import com.qt.backend.repo.SaveRepository;

import org.springframework.stereotype.Service;
import com.qt.backend.repo.LikeRepository;
import com.qt.backend.repo.CommentRepository;
import com.qt.backend.repo.FollowsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SaveService {

    private final SaveRepository saveRepository;
    private final LikeRepository likeRepository;
    private final CommentRepository commentRepository;
    private final FollowsRepository followsRepository;

    public List<PostDto> getSavedPosts(String userId) { 
        List<PostDto> posts = saveRepository.findSavedPostsByUserId(userId);
        for (PostDto post : posts) {
            post.setLikes(likeRepository.findCountOfLikeByPostId(post.getPostId()));
            post.setComments(commentRepository.findCountOfCommentByPostId(post.getPostId()));
            post.setIsLiked(likeRepository.findAnyLikeByPostIdAndUserId(post.getPostId(), userId));
            post.setIsSaved(saveRepository.findAnySaveByPostIdAndUserId(post.getPostId(), userId));
            post.getUser().setIsFollowed(followsRepository.findAnyFollowByUserIdAndFollowingId(userId, post.getUser().getUserId()));
        }
        return posts;
    }

}
