// import Message from "./Message.jsx";

import { useRecoilValue } from "recoil";
import useGetMessages from "./useGetMessages.js";
import { userEmailState } from "../store/selectors/userEmail.js";
import { userIdState } from "../store/selectors/userId.js";
import Message from "./Message.jsx";
import useListenMessages from "./useListenMessages.js";


const Messages = () => {
    const {messages,loading} = useGetMessages();
    useListenMessages();
    console.log("Messages: ",messages);
    const userEmail = useRecoilValue(userEmailState);
    const userId = useRecoilValue(userIdState);
    console.log("Current user name: ",userEmail);
    console.log("Current user Id: ",userId);
	return (
		<div className='px-4 flex-1 overflow-auto'>
            {messages.length > 0 && messages.map((message)=>(
                <Message key = {message._id} message = {message}/>
            ))}

            {messages.length === 0 && (
                <p className="text-center" >Send a message to start the conversation</p>
            )}
			{/* <Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message /> */}
		</div>
	);
};
export default Messages;