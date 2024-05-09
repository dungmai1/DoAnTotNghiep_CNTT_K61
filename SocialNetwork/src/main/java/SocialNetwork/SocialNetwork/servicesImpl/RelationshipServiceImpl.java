package SocialNetwork.SocialNetwork.servicesImpl;

import SocialNetwork.SocialNetwork.domain.entities.Like;
import SocialNetwork.SocialNetwork.domain.entities.Relationship;
import SocialNetwork.SocialNetwork.domain.entities.User;
import SocialNetwork.SocialNetwork.domain.models.serviceModels.UserServiceModel;
import SocialNetwork.SocialNetwork.exception.CustomException;
import SocialNetwork.SocialNetwork.repositories.RelationshipRepository;
import SocialNetwork.SocialNetwork.repositories.UserRepository;
import SocialNetwork.SocialNetwork.services.RelationshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class RelationshipServiceImpl implements RelationshipService {
    private UserRepository userRepository;
    private RelationshipRepository relationshipRepository;

    public RelationshipServiceImpl(UserRepository userRepository, RelationshipRepository relationshipRepository) {
        this.userRepository = userRepository;
        this.relationshipRepository = relationshipRepository;
    }

    @Override
    public boolean CreateRequestAddingFriend(Integer user, Integer friendCandidateId) {
        User userDefault = userRepository.findById(user).orElse(null);
        User friendCandidate = userRepository.findById(friendCandidateId).orElse(null);
        if(userDefault == null || friendCandidate == null) {
            throw new CustomException("userDefault or friendCandidate not found");
        }
        Relationship relationshipFromDb = relationshipRepository.findRelationshipByUserOneIdAndUserTwoId(user,friendCandidateId);
        if (relationshipFromDb == null) {
            Relationship relationship = new Relationship();
            relationship.setUserOne(userDefault);
            relationship.setUserTwo(friendCandidate);
            relationship.setStatus(0);
            relationshipRepository.save(relationship);
        }else{
            relationshipFromDb.setStatus(0);
            relationshipRepository.save(relationshipFromDb);
        }
        return true;
    }
    @Override
    public boolean acceptFriend(Integer user, Integer friendCandidateId) {
        return this.changeStatusAndSave(user, friendCandidateId, 0, 1);
    }
    @Override
    public boolean cancelFriendRequest(Integer user, Integer friendCandidateId) {
        return this.changeStatusAndSave(user, friendCandidateId, 0, 2);
    }
    @Override
    public boolean removeFriend(Integer userId, Integer friendIdRemove){
        return this.changeStatusAndSave(userId, friendIdRemove, 1, 2);
    }

    @Override
    public List<User> getAllFriend(Integer userId) {
        User user = userRepository.findById(userId).orElse(null);
        if(user == null) {
            throw new CustomException("user not found");
        }
        List<Relationship> relationshipList = relationshipRepository.findAllNotCandidatesForFriends(userId);
        List<User> users = new ArrayList<>();
        for (Relationship relationship : relationshipList) {
            if (!relationship.getUserOne().getId().equals(userId)) {
                users.add(relationship.getUserOne());
            } else {
                users.add(relationship.getUserTwo());
            }
        }
        return users;
    }

    @Override
    public boolean changeStatusAndSave(Integer userId, Integer friendId, int fromStatus, int toStatus) {
        User userDefault = userRepository.findById(userId).orElse(null);
        User friendCandidate = userRepository.findById(friendId).orElse(null);
        if(userDefault == null || friendCandidate == null) {
            throw new CustomException("userDefault or friendCandidate not found");
        }
        Relationship relationship = this.relationshipRepository
                .findRelationshipWithFriendWithStatus(
                        userId, friendId, fromStatus);
        relationship.setStatus(toStatus);
        return this.relationshipRepository.save(relationship) != null;
    }
}
