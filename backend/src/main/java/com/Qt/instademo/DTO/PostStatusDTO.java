package com.Qt.instademo.repository.DTO;

import java.util.List;

import com.Qt.instademo.model.Comment;
import com.Qt.instademo.model.Like;
import com.Qt.instademo.model.Post;
import com.Qt.instademo.model.SavedPost;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostStatusDTO {

    Post post;
    List<Like> Linkes;
    List<Comment> Comments;
    List<SavedPost> SavedPosts;
    
}
