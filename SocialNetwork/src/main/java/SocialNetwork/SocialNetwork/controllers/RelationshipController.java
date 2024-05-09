package SocialNetwork.SocialNetwork.controllers;

import SocialNetwork.SocialNetwork.common.ApiResponse;
import SocialNetwork.SocialNetwork.domain.entities.User;
import SocialNetwork.SocialNetwork.services.RelationshipService;
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
    @PostMapping("/addFriend")
    public ResponseEntity<ApiResponse> addFriend(Integer userId, Integer friendId){
        relationshipService.CreateRequestAddingFriend(userId,friendId);
        return new ResponseEntity<>(new ApiResponse(true, "Create Request Adding Friend Success"),HttpStatus.OK);
    }
    @PostMapping("/acceptFriend")
    public ResponseEntity<ApiResponse> acceptFriend(Integer userId, Integer friendId){
        relationshipService.acceptFriend(userId,friendId);
        return new ResponseEntity<>(new ApiResponse(true, "Accept Friend Success"),HttpStatus.OK);
    }
    @PostMapping("/cancelFriend")
    public ResponseEntity<ApiResponse> cancelFriend(Integer userId, Integer friendId){
        relationshipService.cancelFriendRequest(userId,friendId);
        return new ResponseEntity<>(new ApiResponse(true, "Cancel Friend Success"),HttpStatus.OK);
    }
    @PostMapping("/removeFriend")
    public ResponseEntity<ApiResponse> removeFriend(Integer userId, Integer friendId){
        relationshipService.removeFriend(userId,friendId);
        return new ResponseEntity<>(new ApiResponse(true, "Remove Friend Success"),HttpStatus.OK);
    }
    @GetMapping("/allFriend/{userId}")
    public List<User> AllFriendWithUserId(@PathVariable Integer userId){
        List<User> users =  relationshipService.getAllFriend(userId);
        return users;
    }
}
