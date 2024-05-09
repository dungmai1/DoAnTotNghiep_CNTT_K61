package SocialNetwork.SocialNetwork.services;


import SocialNetwork.SocialNetwork.domain.entities.User;
import SocialNetwork.SocialNetwork.domain.models.serviceModels.UserServiceModel;

import java.util.List;

public interface RelationshipService{
    boolean CreateRequestAddingFriend(Integer user, Integer friendCandidateId);
    boolean acceptFriend(Integer user, Integer friendCandidateId);
    boolean cancelFriendRequest(Integer user, Integer friendCandidateId);
    boolean changeStatusAndSave(Integer userId, Integer friendId, int fromStatus, int toStatus);
    boolean removeFriend(Integer userId, Integer friendIdRemove);
    List<User> getAllFriend(Integer userId);
}
