package SocialNetwork.SocialNetwork.services;


import SocialNetwork.SocialNetwork.domain.entities.User;
import SocialNetwork.SocialNetwork.domain.models.serviceModels.UserServiceModel;

import java.util.List;

public interface RelationshipService{
    boolean CreateRequestAddingFriend(User user, String phone);
//    List<User> getAllFriendOfUser(String phone);
    List<User> getFollower(String phone);
    List<User> getFollowing(String phone);
    boolean checkFollow(User user,String phone);
}
