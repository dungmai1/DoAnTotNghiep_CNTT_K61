package SocialNetwork.SocialNetwork.services;

import SocialNetwork.SocialNetwork.domain.entities.Comment;
import SocialNetwork.SocialNetwork.domain.models.bindingModels.CommentCreateBindingModel;

import java.util.List;

public interface CommentService {
    boolean addComment(CommentCreateBindingModel commentCreateBindingModel);
    int CountAllCommentsForPost(Integer PostID);

    void deleteComment(Integer userId, Integer postId, Integer commentId);
    List<Comment> getAllCommentForPost(Integer PostID);
}
