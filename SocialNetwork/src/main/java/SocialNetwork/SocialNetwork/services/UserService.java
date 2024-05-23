package SocialNetwork.SocialNetwork.services;

import SocialNetwork.SocialNetwork.domain.entities.User;

public interface UserService {
    public User findUserByJwt(String jwt);
}
