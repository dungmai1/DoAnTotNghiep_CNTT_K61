import request from './request'

class UserService{
    getUserByPhone(phone){
        return request.get(`user/${phone}`)
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