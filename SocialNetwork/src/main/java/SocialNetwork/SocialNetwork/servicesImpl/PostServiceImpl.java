package SocialNetwork.SocialNetwork.servicesImpl;

import SocialNetwork.SocialNetwork.domain.entities.User;
import SocialNetwork.SocialNetwork.domain.models.bindingModels.PostCreateBindingModel;
import SocialNetwork.SocialNetwork.domain.entities.Post;
import SocialNetwork.SocialNetwork.domain.models.serviceModels.PostServiceModel;
import SocialNetwork.SocialNetwork.exception.CustomException;
import SocialNetwork.SocialNetwork.repositories.PostRepository;
import SocialNetwork.SocialNetwork.repositories.UserRepository;
import SocialNetwork.SocialNetwork.services.PostService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    @Autowired
    public PostServiceImpl(PostRepository postRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }
    @Override
    public boolean createPost(PostCreateBindingModel postCreateBindingModel) {
        PostServiceModel postServiceModel = new PostServiceModel();
        postServiceModel.setUser(postCreateBindingModel.getUser());
        postServiceModel.setContent(postCreateBindingModel.getContent());
        postServiceModel.setImageUrl(postCreateBindingModel.getImageUrl());
        postServiceModel.setPostTime(LocalDateTime.now());
        postServiceModel.setLikeList(new ArrayList<>());
        postServiceModel.setCommentList(new ArrayList<>());
        Post post = this.modelMapper.map(postServiceModel, Post.class);
        postRepository.save(post);
        return true;
    }
    @Override
    public List<PostServiceModel> getAllPosts(String timelineUserId) {
        return null;
    }

    @Override
    public boolean deletePost(Integer userId, Integer PostId) throws CustomException {
        if (userId == null || PostId == null) {
            throw new CustomException("userId or PostId not exists");
        }
        User userPost = userRepository.findById(userId).orElse(null);
        Post PostToRemove = postRepository.findById(PostId).orElse(null);

        if (userPost == null || PostToRemove == null) {
            throw new CustomException("userId or PostId not found");
        }
        if (!userPost.getId().equals(PostToRemove.getUser().getId())) {
            throw new CustomException("This user is not the poster");
        }
        postRepository.delete(PostToRemove);
        return true;
    }
}
