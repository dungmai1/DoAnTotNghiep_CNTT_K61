package SocialNetwork.SocialNetwork.services;

import SocialNetwork.SocialNetwork.domain.models.bindingModels.PostCreateBindingModel;
import SocialNetwork.SocialNetwork.domain.models.serviceModels.PostServiceModel;
import org.springframework.stereotype.Service;

import java.util.List;
public interface PostService {
    public boolean createPost(PostCreateBindingModel postCreateBindingModel);
    public List<PostServiceModel> getAllPosts(String timelineUserId);
    public boolean deletePost(Integer userId,Integer PostId);
}
