package SocialNetwork.SocialNetwork.servicesImpl;

import SocialNetwork.SocialNetwork.domain.entities.Like;
import SocialNetwork.SocialNetwork.domain.entities.Saved;
import SocialNetwork.SocialNetwork.domain.entities.User;
import SocialNetwork.SocialNetwork.domain.models.bindingModels.PostCreateBindingModel;
import SocialNetwork.SocialNetwork.domain.entities.Post;
import SocialNetwork.SocialNetwork.domain.models.serviceModels.PostServiceModel;
import SocialNetwork.SocialNetwork.exception.CustomException;
import SocialNetwork.SocialNetwork.repositories.PostRepository;
import SocialNetwork.SocialNetwork.repositories.SavedRepository;
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
    private final SavedRepository savedRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public PostServiceImpl(PostRepository postRepository, UserRepository userRepository, SavedRepository savedRepository, ModelMapper modelMapper) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.savedRepository = savedRepository;
        this.modelMapper = modelMapper;
    }
    @Override
    public boolean createPost(PostCreateBindingModel postCreateBindingModel, User user) {
        PostServiceModel postServiceModel = new PostServiceModel();
        postServiceModel.setUser(user);
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
    public List<PostServiceModel> getAllPostsByUser(User user) {
        List<Post> postList = postRepository.findAllByUser(user);
        List<PostServiceModel> postServiceModels = new ArrayList<>();
        for (Post post : postList) {
            PostServiceModel postServiceModel = modelMapper.map(post, PostServiceModel.class);
            postServiceModels.add(postServiceModel);
        }
        return postServiceModels;
    }

    @Override
    public boolean deletePost(User user, Integer PostId) throws CustomException {
        Post PostToRemove = postRepository.findById(PostId).orElse(null);
        postRepository.delete(PostToRemove);
        return true;
    }

    @Override
    public PostServiceModel getSinglePost(User user,Integer postId) {
        Post post = postRepository.findById(postId).orElse(null);
        PostServiceModel postServiceModel = modelMapper.map(post, PostServiceModel.class);
        return postServiceModel;
    }

    @Override
    public List<PostServiceModel> getAllPosts(User user) {
        List<Post> postList = postRepository.findAll();
        List<PostServiceModel> postServiceModels = new ArrayList<>();
        for (Post post : postList) {
            PostServiceModel postServiceModel = modelMapper.map(post, PostServiceModel.class);
            postServiceModels.add(postServiceModel);
        }
        return postServiceModels;
    }

    @Override
    public boolean savePost(User user, Integer postId) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) {
            return false;
        }
        Saved checksaved = savedRepository.findByUserAndPost(user, post);
        if ( checksaved != null ) {
            savedRepository.delete(checksaved);
        }else {
            Saved saved = new Saved();
            saved.setPost(post);
            saved.setUser(user);
            savedRepository.save(saved);
        }
        return true;
    }

    @Override
    public List<PostServiceModel> GetAllSavedPost(User user) {
        List<Saved> savedPosts = savedRepository.findAllByUser(user);
        List<PostServiceModel> postServiceModels = new ArrayList<>();
        for (Saved saved : savedPosts) {
            Post post = saved.getPost();
            PostServiceModel postServiceModel = modelMapper.map(post, PostServiceModel.class);
            postServiceModels.add(postServiceModel);
        }
        return postServiceModels;
    }

    @Override
    public List<PostServiceModel> getAllPostsByPhone(String phone) {
        User user = userRepository.findByPhone(phone).orElse(null);
        List<Post> postList = postRepository.findAllByUser(user);
        List<PostServiceModel> postServiceModels = new ArrayList<>();
        for (Post post : postList) {
            PostServiceModel postServiceModel = modelMapper.map(post, PostServiceModel.class);
            postServiceModels.add(postServiceModel);
        }
        return postServiceModels;
    }

    @Override
    public List<PostServiceModel> getAllPostsByImagePath(List<String> imagePaths) {
        List<Post> postList = postRepository.findByImageUrls(imagePaths);
        List<PostServiceModel> postServiceModels = new ArrayList<>();
        for (Post post : postList) {
            PostServiceModel postServiceModel = modelMapper.map(post, PostServiceModel.class);
            postServiceModels.add(postServiceModel);
        }
        return postServiceModels;    }


}
