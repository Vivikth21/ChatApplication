// import Sidebar from "./Sidebar";
// import MessageContainer from "./MessageContainer";

// const Home = () => {
    
// 	return (
// 		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
// 			<Sidebar />
// 			<MessageContainer />
// 		</div>
// 	);
// };
// export default Home;

import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

const Home = () => {
	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-black'>
				<Sidebar />
				<MessageContainer />
			</div>
		</div>
	);
};
export default Home;
