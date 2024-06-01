import request from "./request";

class RelationshipService {
  Followers(phone) {
    return request.get(`relationship/followers/${phone}`);
  }
  Following(phone) {
    return request.get(`relationship/following/${phone}`);
  }
  AddFollow(token, targetId) {
    return request.post(`relationship/addFollow?friendId=${targetId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
export default new RelationshipService();
