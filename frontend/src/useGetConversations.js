import axios from "axios";
import { useEffect, useState } from "react"

const useGetConversations = ()=> {
    const [loading,setLoading] = useState(false);
    const [conversation,setConversation] = useState([]);

    useEffect(()=>{
        const getConversations = async()=>{
            setLoading(true)
            try {
                const response = await axios.get('http://localhost:3000/allUsers',{
                    headers:{
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
                setConversation(response.data);
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
        }

        getConversations();
    },[])

    return { loading,conversation };
}

export default useGetConversations;