import request from './request'

class UserService{
    getUser(token){
        return request.get("user/",{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
}
export default new UserService();