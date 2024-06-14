package SocialNetwork.SocialNetwork.controllers;

import SocialNetwork.SocialNetwork.common.ApiResponse;
import SocialNetwork.SocialNetwork.domain.entities.User;
import SocialNetwork.SocialNetwork.exception.CustomException;
import SocialNetwork.SocialNetwork.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable String username){
        User user = userService.findUserByUsername(username);
        return user;
    }
    @GetMapping("/search")
    public List<User> getUsers(@RequestHeader("Authorization") String jwt,String textSearch){
        List<User> users = userService.searchUserName(textSearch);
        return users;
    }
    @GetMapping("/getAllUser")
    public List<User> getAllUser(@RequestHeader("Authorization") String jwt){
        List<User> users = userService.getAllUser();
        return users;
    }
    @PutMapping("/updateUser")
    public ResponseEntity<ApiResponse> updateUser(@RequestHeader("Authorization") String jwt ,@RequestBody String avatar){
        try{
            User user = userService.findUserByJwt(jwt);
            userService.updateUser(user,avatar);
            return new ResponseEntity<>(new ApiResponse(true,"Update User success"), HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(new ApiResponse(false, e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}
