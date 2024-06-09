import request from './request'

class UserService{
    getUserByUserName(username){
        return request.get(`user/${username}`)
    }
    getUser(token){
        return request.get("user/",{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}
export default new UserService();