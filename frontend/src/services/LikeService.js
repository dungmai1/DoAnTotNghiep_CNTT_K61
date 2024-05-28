import request from './request'

class LikeService{
    CountAllLikeForPost(PostId) {
        return request.get(`like/CountAllLikeForPost?PostId=${PostId}`);
    }
    AllUserLikePost(PostId){
        return request.get(`like/AllUserLikePost?PostId=${PostId}`)
    }
    AddLike(PostId,token){
        return request.post(`like/add?PostId=${PostId}`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
    }
}
export default new LikeService();