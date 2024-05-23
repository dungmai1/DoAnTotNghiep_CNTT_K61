package SocialNetwork.SocialNetwork.controllers;

import SocialNetwork.SocialNetwork.common.ApiResponse;
import SocialNetwork.SocialNetwork.domain.entities.User;
import SocialNetwork.SocialNetwork.services.RelationshipService;
import SocialNetwork.SocialNetwork.services.UserService;
import SocialNetwork.SocialNetwork.servicesImpl.RelationshipServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/relationship")
public class RelationshipController {
    @Autowired
    private RelationshipService relationshipService;
    @Autowired
    private UserService userService;
    @PostMapping("/addFriend")
    public ResponseEntity<ApiResponse> addFriend(@RequestHeader("Authorization") String jwt,
                                                 Integer friendId){
        User user = userService.findUserByJwt(jwt);
        relationshipService.CreateRequestAddingFriend(user,friendId);
        return new ResponseEntity<>(new ApiResponse(true, "Create Request Adding Friend Success"),HttpStatus.OK);
    }
    @PostMapping("/acceptFriend")
    public ResponseEntity<ApiResponse> acceptFriend(@RequestHeader("Authorization") String jwt,
                                                    Integer friendId){
        User user = userService.findUserByJwt(jwt);
        relationshipService.acceptFriend(user,friendId);
        return new ResponseEntity<>(new ApiResponse(true, "Accept Friend Success"),HttpStatus.OK);
    }
    @PostMapping("/cancelFriend")
    public ResponseEntity<ApiResponse> cancelFriend(@RequestHeader("Authorization") String jwt,
                                                    Integer friendId){
        User user = userService.findUserByJwt(jwt);
        relationshipService.cancelFriendRequest(user,friendId);
        return new ResponseEntity<>(new ApiResponse(true, "Cancel Friend Success"),HttpStatus.OK);
    }
    @PostMapping("/removeFriend")
    public ResponseEntity<ApiResponse> removeFriend(@RequestHeader("Authorization") String jwt,
                                                    Integer friendId){
        User user = userService.findUserByJwt(jwt);
        relationshipService.removeFriend(user,friendId);
        return new ResponseEntity<>(new ApiResponse(true, "Remove Friend Success"),HttpStatus.OK);
    }
    @GetMapping("/allFriend/{userId}")
    public List<User> AllFriendWithUserId(@RequestHeader("Authorization") String jwt){
        User user = userService.findUserByJwt(jwt);
        List<User> users =  relationshipService.getAllFriendOfUser(user);
        return users;
    }
}
