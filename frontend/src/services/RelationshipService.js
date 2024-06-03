import request from "./request";

class RelationshipService {
  Followers(phone) {
    return request.get(`relationship/followers/${phone}`);
  }
  Following(phone) {
    return request.get(`relationship/following/${phone}`);
  }
  AddFollow(token, phone) {
    return request.post(`relationship/addFollow/${phone}`,null ,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CheckFollow(token, phone) {
    return request.get(`relationship/checkfollow/${phone}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
export default new RelationshipService();
