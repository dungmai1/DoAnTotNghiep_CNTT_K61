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
  getAllPostsByPhone(phone) {
    return request.get(`post/GetAllPostByPhone/${phone}`);
  }
  getAllPostsByImagePaths(imagePaths, token) {
    const queryParams = imagePaths.join("&imagePaths=");
    return request.get(`post/GetAllPostByImagePath?imagePaths=${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
export default new PostService();
