package SocialNetwork.SocialNetwork.domain.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Likes")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;
    @ManyToOne
    private User user;
    @ManyToOne
    private Post post;
    private Long count = 0L;
}
