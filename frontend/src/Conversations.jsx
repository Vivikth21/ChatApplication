import Conversation from "./Conversation";
import useGetConversations from "./useGetConversations";

const Conversations = () => {
    const {loading , conversation} = useGetConversations();
    console.log("Conversations: ",conversation);
	return (
		<div className='py-2 flex flex-col overflow-auto'>
            {conversation.map((convo)=>(
                <Conversation 
                    key={convo._id}
                    conversation = {convo}
                />
            ))}
            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;