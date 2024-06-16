import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selectors/userEmail";
import useConversation from "./zustand/useConversation";
import { userIdState } from "../store/selectors/userId";


const Message = ({message})=>{
    const userEmail = useRecoilValue(userEmailState);
    const userId = useRecoilValue(userIdState);
    const {selectedConversation} = useConversation();
    const currentUser = message.senderId === userId;
    const chatClassName = currentUser ? 'chat-end' : 'chat-start';
    const msgColor = currentUser ? 'bg-blue-500' : "";
    return(
        <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                {/* <img alt='Tailwind CSS chat bubble component' src={profilePic} /> */}
            </div>
        </div>
        <div className={`chat-bubble text-white ${msgColor}  pb-2`}>{message.message}</div>
        {/* <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div> */}
    </div>
    )
}
export default Message;