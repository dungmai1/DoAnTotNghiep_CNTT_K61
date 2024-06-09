package SocialNetwork.SocialNetwork.servicesImpl;

import SocialNetwork.SocialNetwork.config.JwtService;
import SocialNetwork.SocialNetwork.domain.entities.User;
import SocialNetwork.SocialNetwork.exception.CustomException;
import SocialNetwork.SocialNetwork.repositories.UserRepository;
import SocialNetwork.SocialNetwork.services.PostService;
import SocialNetwork.SocialNetwork.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository userRepository;
    @Override
    public User findUserByJwt(String jwt) {
        String token = jwt.substring(7);
        String phone = jwtService.extractUsername(token);
        User user = userRepository.findByPhone(phone).orElse(null);
        if(user==null) {
            throw new CustomException("User not exist with phone "+phone);
        }
        return user;
    }

    @Override
    public User findUserByUsername(String username) {
        User user = userRepository.findByUsname(username).orElse(null);
        if(user==null) {
            throw new CustomException("User not exist with username "+username);
        }
        return user;
    }
}
