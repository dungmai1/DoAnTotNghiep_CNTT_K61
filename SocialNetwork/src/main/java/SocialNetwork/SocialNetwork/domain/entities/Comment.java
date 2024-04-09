package SocialNetwork.SocialNetwork.domain.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@Table(name = "Comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;
    private String content;
    @ManyToOne
    private User user;
    @ManyToOne
    private Post post;
    private String ImageUrl;
    private LocalDateTime CommentTime;
}
