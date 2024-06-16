import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../store/atoms/user";
import { userEmailState } from "../store/selectors/userEmail";
import { io } from "socket.io-client";
import { userIdState } from "../store/selectors/userId";

export const SocketContext = createContext();

export const useSocketContext = ()=>{
    return useContext(SocketContext);
}

export const SocketContextProvider = ({children})=>{
    const [socket,setSocket] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);
    const userEmail = useRecoilValue(userEmailState);
    const userIdentity = useRecoilValue(userIdState);
    console.log("Socket username: ",userEmail);

    useEffect(()=>{
        if(userEmail){
            const socket = io("http://localhost:3000",{
                query:{
                    userId: userIdentity
                },
            });

            setSocket(socket);
            socket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users);
            })

            return ()=> socket.close();
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[userEmail])

    return (
        <SocketContext.Provider value = {{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}