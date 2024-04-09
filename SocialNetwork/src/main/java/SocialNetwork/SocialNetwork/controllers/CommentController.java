package SocialNetwork.SocialNetwork.controllers;

import SocialNetwork.SocialNetwork.common.ApiResponse;
import SocialNetwork.SocialNetwork.domain.models.bindingModels.CommentCreateBindingModel;
import SocialNetwork.SocialNetwork.exception.CustomException;
import SocialNetwork.SocialNetwork.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    private CommentService commentService;
    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createComment(@RequestBody CommentCreateBindingModel commentCreateBindingModel){
        try{
            commentService.addComment(commentCreateBindingModel);
            return new ResponseEntity<>(new ApiResponse(true,"Add Comment Success"), HttpStatus.CREATED);
        }catch (CustomException e){
            return new ResponseEntity<>(new ApiResponse(true,e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/getAllCommentForPost")
    public ResponseEntity CountComment(Integer PostId) {
        try {
            Integer countComment = commentService.getAllCommentsForPost(PostId);
            return ResponseEntity.ok(countComment);
        } catch (CustomException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @DeleteMapping("/delete")
    public ResponseEntity<ApiResponse> deleteComment(Integer UserId, Integer PostId, Integer CommentId) {
        try{
            commentService.deleteComment(UserId,PostId,CommentId);
            return new ResponseEntity<>(new ApiResponse(true,"Delete Comment Success"), HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(new ApiResponse(true,e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}
