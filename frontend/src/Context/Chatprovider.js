import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

const ChatContext = createContext();
const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const[selectedChat,setSelectedChat]=useState();
    const[chats,setChats]=useState([]);
    const[notification,setNotification]=useState([]);
    
    
    const navigate=useNavigate();
    
    useEffect(()=>{
        const userInfo=JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        if(!userInfo)navigate("/");
    //    else if (userInfo ) {
    //         const tokenExpired = isTokenExpired(userInfo.token);
    //         if (tokenExpired) {
    //           localStorage.removeItem("userInfo");
    //           navigate("/")
    //         }
    //     }


    },[navigate]);

    // function isTokenExpired(token) {
    //     try {
    //       const decoded = jwt_decode(token);
    //       const currentTime = Date.now() / 1000; // Convert to seconds
    //       return decoded.exp < currentTime;
    //     } catch (error) {
    //       return true; // If there's an error decoding, assume token is expired
    //     }
    // }
    return(
    
        <ChatContext.Provider
            value={{
                user,
                setUser,
                selectedChat,
                setSelectedChat,
                chats,
                setChats,
                notification,
                setNotification
            }}
            >
                {children}

        </ChatContext.Provider>
    );
   
  
};
export const ChatState=()=>{
    return useContext(ChatContext);
};
export default ChatProvider;
