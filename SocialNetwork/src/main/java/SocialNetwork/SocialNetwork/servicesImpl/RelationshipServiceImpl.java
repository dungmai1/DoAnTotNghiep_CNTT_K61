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
    public boolean CreateRequestAddingFriend(User user, Integer friendCandidateId) {
        User friendCandidate = userRepository.findById(friendCandidateId).orElse(null);
        if( friendCandidate == null) {
            throw new CustomException("friendCandidate not found");
        }
        Relationship relationshipFromDb = relationshipRepository.findRelationshipByUserOneIdAndUserTwoId(user.getId(), friendCandidateId);
        if (relationshipFromDb == null) {
            Relationship relationship = new Relationship();
            relationship.setUserOne(user);
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
    public boolean acceptFriend(User user, Integer friendCandidateId) {
        return this.changeStatusAndSave(user, friendCandidateId, 0, 1);
    }
    @Override
    public boolean cancelFriendRequest(User user, Integer friendCandidateId) {
        return this.changeStatusAndSave(user, friendCandidateId, 0, 2);
    }
    @Override
    public boolean removeFriend(User user, Integer friendIdRemove){
        return this.changeStatusAndSave(user, friendIdRemove, 1, 2);
    }

    @Override
    public List<User> getAllFriendOfUser(User user) {
        List<Relationship> relationshipList = relationshipRepository.findAllNotCandidatesForFriends(user.getId());
        List<User> users = new ArrayList<>();
        for (Relationship relationship : relationshipList) {
            if (!relationship.getUserOne().getId().equals(user.getId())) {
                users.add(relationship.getUserOne());
            } else {
                users.add(relationship.getUserTwo());
            }
        }
        return users;
    }

    @Override
    public boolean changeStatusAndSave(User user, Integer friendId, int fromStatus, int toStatus) {
        User friendCandidate = userRepository.findById(friendId).orElse(null);
        if( friendCandidate == null) {
            throw new CustomException("userDefault or friendCandidate not found");
        }
        Relationship relationship = this.relationshipRepository
                .findRelationshipWithFriendWithStatus(
                        user.getId(), friendId, fromStatus);
        relationship.setStatus(toStatus);
        return this.relationshipRepository.save(relationship) != null;
    }
}
