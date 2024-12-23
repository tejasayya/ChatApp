import { useState } from 'react'
import chatIcon from '../assets/chat.png'


const JoinCreateChat = () => {

    const [detail, setDetail] = useState([
        {
            roomId: "",
            userName: "Abc",
        }
    ]);

    function handleFormInputChange(event){
        setDetail({
            ...detail,
            [event.target.name]: event.target.value,
        });
    }

    function joinChat(){

    }

    function createRoom(){

    }



  return (
    <div className='min-h-screen flex items-center justify-center'>
        <div className='border dark:border-gray-700 p-10 w-full flex flex-col gap-5 max-w-md rounded dark:bg-gray-900 shadow'>

            <div>
                <img src={chatIcon} alt="Chat Icon" className='w-24 mx-auto'/>
            </div>

            <h1 className='text-2xl font-semibold text-center'>Join Room / Create Room</h1>
            
            {/* name div */}
            <div className=''>
                <label htmlFor="name" className='block font-medium mt-8'>Name</label>
            </div>
            <input 
                onChange={handleFormInputChange}
                value={detail.userName}
                type="text" 
                id="name"
                name='userName'
                placeholder='Enter your name'
                className="w-full dark:bg-gray-800 px-4 py-2 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* room id div */}
            <div className=''>
                <label htmlFor="name" className='block font-medium mt-8'>Room ID / New Room ID</label>
            </div>
            <input 
                name='roomId'
                onChange={handleFormInputChange}
                value={detail.roomId}
                type="text" 
                id="name"
                className="w-full dark:bg-gray-800 px-4 py-2 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* buttons */}
            <div className="flex justify-center gap-5 mt-4">
                <button className="px-3 py-2 dark:bg-blue-500 hover:darkbg-blue-800 rounded-full">Join Room</button>
                <button className="px-3 py-2 dark:bg-orange-500 hover:darkbg-orange-800 rounded-full">Create Room</button>

            </div>

        </div>
    </div>
  )
}

export default JoinCreateChat