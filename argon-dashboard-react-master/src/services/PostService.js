import request from "./request";

class PostService {
  getAllPostByUser(token) {
    return request.get("post/GetAllPostByUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  createPost(post, token) {
    return request.post("post/create", post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getAllPost(token) {
    return request.get("post/GetAllPost", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetAllPostByUsername(username) {
    return request.get(`post/GetAllPostByUsername/${username}`);
  }
  getAllPostsByImagePaths(imagePaths, token) {
    const queryParams = imagePaths.join("&imagePaths=");
    return request.get(`post/GetAllPostByImagePath?imagePaths=${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetAllPostByFollowing(token, username) {
    return request.get(`post/GetAllPostByFollowing/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  banPost(token,postID){
    return request.put(`post/banPost?postId=${postID}`,null,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
  UnbanPost(token,postID){
    return request.put(`post/unbanPost?postId=${postID}`,null,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
  getAllPostBanned(token){
    return request.get("post/getAllPostBan",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
}
export default new PostService();
