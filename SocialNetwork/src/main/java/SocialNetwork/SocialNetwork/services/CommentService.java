package SocialNetwork.SocialNetwork.services;

import SocialNetwork.SocialNetwork.domain.models.bindingModels.CommentCreateBindingModel;

public interface CommentService {
    boolean addComment(CommentCreateBindingModel commentCreateBindingModel);
    int getAllCommentsForPost(Integer PostID);

    void deleteComment(Integer userId, Integer postId, Integer commentId);
}
