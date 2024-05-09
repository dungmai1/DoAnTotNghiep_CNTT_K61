package SocialNetwork.SocialNetwork.servicesImpl;

import SocialNetwork.SocialNetwork.domain.entities.Comment;
import SocialNetwork.SocialNetwork.domain.entities.Post;
import SocialNetwork.SocialNetwork.domain.entities.User;
import SocialNetwork.SocialNetwork.domain.models.bindingModels.CommentCreateBindingModel;
import SocialNetwork.SocialNetwork.domain.models.serviceModels.CommentServiceModel;
import SocialNetwork.SocialNetwork.exception.CustomException;
import SocialNetwork.SocialNetwork.repositories.CommentRepository;
import SocialNetwork.SocialNetwork.repositories.PostRepository;
import SocialNetwork.SocialNetwork.repositories.UserRepository;
import SocialNetwork.SocialNetwork.services.CommentService;
import org.modelmapper.ModelMapper;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    private CommentRepository commentRepository;
    private PostRepository postRepository;
    private UserRepository userRepository;
    private ModelMapper modelMapper;

    public CommentServiceImpl(CommentRepository commentRepository, PostRepository postRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public boolean addComment(CommentCreateBindingModel commentCreateBindingModel) {
        User user = userRepository.findById(commentCreateBindingModel.getUser().getId()).orElse(null);
        Post post = postRepository.findById(commentCreateBindingModel.getPost().getId()).orElse(null);

        if(user == null || post == null) {
            throw new CustomException("userId or PostId not found");
        }
        CommentServiceModel commentServiceModel = new CommentServiceModel();
        commentServiceModel.setCommentTime(LocalDateTime.now());
        commentServiceModel.setUser(user);
        commentServiceModel.setPost(post);
        commentServiceModel.setImageUrl(commentServiceModel.getImageUrl());
        commentServiceModel.setContent(commentServiceModel.getContent());
        Comment comment = this.modelMapper.map(commentServiceModel, Comment.class);
        commentRepository.save(comment);
        return true;
    }

    @Override
    public int CountAllCommentsForPost(Integer PostID) {
        Post post = postRepository.findById(PostID).orElse(null);
        if(post == null){
            throw new CustomException("PostId not found");
        }
        List<Comment> commentList = commentRepository.findAllByPost(post);
        return commentList.size();
    }

    @Override
    public void deleteComment(Integer userId, Integer postId, Integer commentId) {
        User user = userRepository.findById(userId).orElse(null);
        Post post = postRepository.findById(postId).orElse(null);

        if(user == null || post == null) {
            throw new CustomException("userId or PostId not found");
        }
        Comment comment = commentRepository.findByUserAndPostAndAndId(user,post,commentId);
        commentRepository.delete(comment);
    }

    @Override
    public List<Comment> getAllCommentForPost(Integer PostID) {
        Post post = postRepository.findById(PostID).orElse(null);
        if(post == null) {
            throw new CustomException("userId or PostId not found");
        }
        List<Comment> commentList = commentRepository.findAllByPost(post);
        return commentList;
    }
}
