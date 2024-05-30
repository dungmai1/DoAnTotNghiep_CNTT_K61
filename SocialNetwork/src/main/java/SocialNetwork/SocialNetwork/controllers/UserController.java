package SocialNetwork.SocialNetwork.controllers;

import SocialNetwork.SocialNetwork.domain.entities.User;
import SocialNetwork.SocialNetwork.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000/")

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("/")
    public User getUser(@RequestHeader("Authorization") String jwt){
        User user = userService.findUserByJwt(jwt);
        return user;
    }
}
