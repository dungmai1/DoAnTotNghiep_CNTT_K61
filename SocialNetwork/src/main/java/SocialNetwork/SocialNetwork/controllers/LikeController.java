package SocialNetwork.SocialNetwork.controllers;

import SocialNetwork.SocialNetwork.common.ApiResponse;
import SocialNetwork.SocialNetwork.domain.entities.User;
import SocialNetwork.SocialNetwork.exception.CustomException;
import SocialNetwork.SocialNetwork.services.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/like")
public class LikeController {
    @Autowired
    private LikeService likeService;
    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addLike(Integer userId, Integer PostId){
        try{
            likeService.addLike(PostId,userId);
            return new ResponseEntity<>(new ApiResponse(true,"Like success"), HttpStatus.CREATED);
        }catch (CustomException e){
            return new ResponseEntity<>(new ApiResponse(false, e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/AllLikeForPost")
    public ResponseEntity allLikeForPost(Integer postId) {
        try {
            Integer countLike = likeService.getAllLikesForPost(postId);
            return ResponseEntity.ok(countLike);
        } catch (CustomException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @DeleteMapping("/UnLike")
    public ResponseEntity UnLike(Integer userId, Integer PostId){
        try{
            likeService.unlike(PostId,userId);
            return new ResponseEntity<>(new ApiResponse(true,"UnLike Success"),HttpStatus.BAD_REQUEST);
        }catch (CustomException e){
            return new ResponseEntity<>(new ApiResponse(false,"UnLike Fail"),HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/AllUserLikePost")
    public List<User> getAllUserLikePost(Integer PostId){
        List<User> userList = likeService.getAllUserLikePost(PostId);
        return userList;
    }
}
