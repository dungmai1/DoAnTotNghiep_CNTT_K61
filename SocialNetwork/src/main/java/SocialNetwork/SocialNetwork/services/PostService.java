package SocialNetwork.SocialNetwork.services;

import SocialNetwork.SocialNetwork.domain.entities.Post;
import SocialNetwork.SocialNetwork.domain.models.bindingModels.PostCreateBindingModel;
import SocialNetwork.SocialNetwork.domain.models.serviceModels.PostServiceModel;
import org.springframework.stereotype.Service;

import java.util.List;
public interface PostService {
    public boolean createPost(PostCreateBindingModel postCreateBindingModel);
    public List<PostServiceModel> getAllPosts(Integer userId);
    public boolean deletePost(Integer userId,Integer PostId);

    PostServiceModel getSinglePost(Integer userId, Integer postId);
}
