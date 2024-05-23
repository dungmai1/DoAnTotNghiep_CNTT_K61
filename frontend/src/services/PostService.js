import axios from 'axios'
import request from './request'

class PostService{
    getAllPost(){
        return request.get("post/GetAllPost?UserId=1")
    }
    createPost(post){
        return request.post("post/create",post)
    }
}
export default new PostService();