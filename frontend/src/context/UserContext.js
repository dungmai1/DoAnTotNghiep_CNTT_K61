import { useState,createContext, useEffect } from "react";
import UserService from "../services/UserService";

const UserContext = createContext()

function UserProvider({children}){
    const [user, setuser] = useState(null);
    const token = localStorage.getItem("accessToken");
    
    useEffect(() => {
      UserService.getUser(token)
        .then((res) => {
          setuser(res.data);
        })
        .catch((error) => {
          console.error("Error get User", error);
        });
    }, []);
    return (
        <UserContext.Provider value={user} >
            {children}
        </UserContext.Provider>
    )
}
export {UserContext,UserProvider}