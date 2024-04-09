package SocialNetwork.SocialNetwork.domain.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "Posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String content;
    @ManyToOne
    private User user;
    private LocalDateTime PostTime;
    private String ImageUrl;
    @OneToMany
    private List<Like> likeList;
    @OneToMany
    private List<Comment> commentList;
}
