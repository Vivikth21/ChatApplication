
import axios from "axios";


import { useState } from "react";
import useConversation from "./zustand/useConversation";


const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		setLoading(true);
		try {

            console.log(JSON.stringify(message));
            const response = await axios.post(`https://chatapplication-8eox.onrender.com/message/send/${selectedConversation._id}`,{message},{
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

            setMessages([...messages,response.data])
		} catch (error) {
			console.log(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;