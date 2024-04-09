package SocialNetwork.SocialNetwork.services;


import SocialNetwork.SocialNetwork.domain.entities.User;

import java.util.List;

public interface LikeService {
    boolean addLike(Integer postId, Integer userId);

    int getAllLikesForPost(Integer postId);
    boolean unlike(Integer postId, Integer userId);
    List<User> getAllUserLikePost(Integer postId);
}
