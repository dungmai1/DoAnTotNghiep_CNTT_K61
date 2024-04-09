package SocialNetwork.SocialNetwork.domain.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "Messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    private User fromUser;
    @ManyToOne
    private User toUser;
    private String content;
    private Date MessageTime;
}
