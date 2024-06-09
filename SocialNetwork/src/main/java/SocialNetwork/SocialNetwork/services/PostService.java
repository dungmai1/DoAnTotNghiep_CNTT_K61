package SocialNetwork.SocialNetwork.services;

import SocialNetwork.SocialNetwork.domain.entities.Post;
import SocialNetwork.SocialNetwork.domain.entities.User;
import SocialNetwork.SocialNetwork.domain.models.bindingModels.PostCreateBindingModel;
import SocialNetwork.SocialNetwork.domain.models.serviceModels.PostServiceModel;
import org.springframework.stereotype.Service;

import java.util.List;
public interface PostService {
    public boolean createPost(PostCreateBindingModel postCreateBindingModel, User user);
    public List<PostServiceModel> getAllPostsByUser(User user);
    public boolean deletePost(User user,Integer PostId);

    PostServiceModel getSinglePost(User user, Integer postId);
    public List<PostServiceModel> getAllPosts(User user);

    public boolean savePost(User user, Integer postId);
    public List<PostServiceModel> GetAllSavedPost(User user);

    List<PostServiceModel> getAllPostsByUsername(String username);

    List<PostServiceModel> getAllPostsByImagePath(List<String> imagePaths);
}
