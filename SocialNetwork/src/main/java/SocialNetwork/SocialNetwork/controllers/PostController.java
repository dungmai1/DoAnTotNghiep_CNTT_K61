package SocialNetwork.SocialNetwork.controllers;

import SocialNetwork.SocialNetwork.common.ApiResponse;
import SocialNetwork.SocialNetwork.domain.entities.User;
import SocialNetwork.SocialNetwork.domain.models.bindingModels.PostCreateBindingModel;
import SocialNetwork.SocialNetwork.exception.CustomException;
import SocialNetwork.SocialNetwork.services.PostService;
import SocialNetwork.SocialNetwork.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    private PostService postService;
    @Autowired
    private UserService userService;
    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createPost(@RequestBody PostCreateBindingModel postCreateBindingModel) {
        postService.createPost(postCreateBindingModel);
        return new ResponseEntity<>(new ApiResponse(true, "Post has been created"), HttpStatus.CREATED);
    }
    @DeleteMapping("/delete")
    public ResponseEntity<ApiResponse> deletePost(Integer userId, Integer PostId){
        try{
            postService.deletePost(userId,PostId);
            return new ResponseEntity<>(new ApiResponse(true, "Delete Post success"), HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(new ApiResponse(false, e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}
