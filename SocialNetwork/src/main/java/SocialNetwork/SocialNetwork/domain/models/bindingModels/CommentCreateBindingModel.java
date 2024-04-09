package SocialNetwork.SocialNetwork.domain.models.bindingModels;

import SocialNetwork.SocialNetwork.domain.entities.Post;
import SocialNetwork.SocialNetwork.domain.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
public class CommentCreateBindingModel {
    private Post post;
    private String content;
    private String ImageUrl;
    @JsonIgnoreProperties({"displayName", "userName", "password", "email"})
    private User user;
}
