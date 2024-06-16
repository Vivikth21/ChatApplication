import { useEffect ,useState} from "react";
import useConversation from "./zustand/useConversation";
import axios from "axios";


const useGetMessages = ()=>{
    const [loading,setLoading] = useState(false);
    const {messages,setMessages,selectedConversation} = useConversation();

    useEffect(()=>{
        const getMessages = async()=>{
            setLoading(true);
            try {
                console.log("123")
                const response = await axios.get(`http://localhost:3000/message/${selectedConversation._id}`,{
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
                setMessages(response.data);
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
        }

        if(selectedConversation?._id) getMessages()
    },[selectedConversation?._id,setMessages])
    return {messages,loading};
}
export default useGetMessages;