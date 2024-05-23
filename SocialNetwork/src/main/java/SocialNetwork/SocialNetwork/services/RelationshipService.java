package SocialNetwork.SocialNetwork.services;


import SocialNetwork.SocialNetwork.domain.entities.User;
import SocialNetwork.SocialNetwork.domain.models.serviceModels.UserServiceModel;

import java.util.List;

public interface RelationshipService{
    boolean CreateRequestAddingFriend(User user, Integer friendCandidateId);
    boolean acceptFriend(User user, Integer friendCandidateId);
    boolean cancelFriendRequest(User user, Integer friendCandidateId);
    boolean changeStatusAndSave(User user, Integer friendId, int fromStatus, int toStatus);
    boolean removeFriend(User user, Integer friendIdRemove);
    List<User> getAllFriendOfUser(User user);
}
