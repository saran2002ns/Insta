package com.qt.backend.service;

import com.qt.backend.dto.PostDto;
import com.qt.backend.repo.LikeRepository;
import com.qt.backend.repo.PostRepository;
import com.qt.backend.repo.CommentRepository;
import com.qt.backend.repo.SaveRepository;
import com.qt.backend.repo.FollowsRepository;

import java.util.HashSet;
import java.util.List;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;

@Service
@RequiredArgsConstructor
public class PostService {

    private final LikeRepository likeRepository;
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final SaveRepository saveRepository;
    private final FollowsRepository followsRepository;

    public PostDto getPostByIdAndUserId(Long postId, String userId) {
        
            PostDto postDto = postRepository.findPostDtoById(postId);
            postDto.setLikes(likeRepository.findCountOfLikeByPostId(postId));
            postDto.setComments(commentRepository.findCountOfCommentByPostId(postId));
            postDto.setIsLiked(likeRepository.findAnyLikeByPostIdAndUserId(postId, userId));
            postDto.setIsSaved(saveRepository.findAnySaveByPostIdAndUserId(postId, userId));
            return postDto;
       
    }

    public List<PostDto> getPostsByUserId(String userId) {
        
            List<PostDto> posts = postRepository.findPostsByUserId(userId);
            for (PostDto post : posts) {
                post.setLikes(likeRepository.findCountOfLikeByPostId(post.getPostId()));
                post.setComments(commentRepository.findCountOfCommentByPostId(post.getPostId()));
                post.setIsLiked(likeRepository.findAnyLikeByPostIdAndUserId(post.getPostId(), userId));
                post.setIsSaved(saveRepository.findAnySaveByPostIdAndUserId(post.getPostId(), userId));
            }
            return posts;
       
    }

    public List<PostDto> getFeedPostsForUser(String userId, int page) {
      
            HashSet<String> followingIds = new HashSet<>(followsRepository.findFollowingByUserId(userId.toString())
                    .stream().map(dto -> dto.getUserId()).toList());
            List<PostDto> feeds = postRepository.findFeedPostsForUser(userId, followingIds, PageRequest.of(page, 10));
            for (PostDto feed : feeds) {
                feed.setLikes(likeRepository.findCountOfLikeByPostId(feed.getPostId()));
                feed.setComments(commentRepository.findCountOfCommentByPostId(feed.getPostId()));
                feed.setIsSaved(saveRepository.findAnySaveByPostIdAndUserId(feed.getPostId(), userId));
            }
            return feeds;
        
       
    }

    public List<PostDto> getReelsPostsForUser(String userId, int page) {
     
            HashSet<String> followingIds = new HashSet<>(followsRepository.findFollowingByUserId(userId.toString())
                    .stream().map(dto -> dto.getUserId()).toList());
            List<PostDto> reels = postRepository.findReelsPostsForUser(userId, followingIds, PageRequest.of(page, 5));
            for (PostDto reel : reels) {
                reel.setLikes(likeRepository.findCountOfLikeByPostId(reel.getPostId()));
                reel.setComments(commentRepository.findCountOfCommentByPostId(reel.getPostId()));
                reel.setIsSaved(saveRepository.findAnySaveByPostIdAndUserId(reel.getPostId(), userId));
            }
            return reels;
        
    }
}
