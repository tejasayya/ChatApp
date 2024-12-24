import { useEffect, useRef, useState } from "react"
import { FaCircleArrowUp } from "react-icons/fa6"
import { MdAttachFile } from "react-icons/md"
import { useNavigate } from "react-router";
import useChatContext from "../context/ChatContext";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { baseURL } from "../config/AxiosHelper";
import { getMessagess } from "../services/RoomService";
import { timeAgo } from './../config/helper';

const ChatPage = () => {

    const {
        roomId,
        currentUser,
        connected,
        setConnected,
        setRoomId,
        setCurrentUser,
      } = useChatContext();
      // console.log(roomId);
      // console.log(currentUser);
      // console.log(connected);
    
      const navigate = useNavigate();
      useEffect(() => {
        if (!connected) {
          navigate("/");
        }
      }, [connected, roomId, currentUser]);

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    // const inputRef = useRef(null);
    const chatBoxRef = useRef(null);
    const [stompClient, setStompClient] = useState(null);

    //page init:
    //messages ko load karne honge

    useEffect(() => {
        async function loadMessages() {
        try {
            const messages = await getMessagess(roomId);
            // console.log(messages);
            setMessages(messages);
        } catch (error) {
            console.log(error);
        }
        }
        if (connected) {
        loadMessages();
        }
    }, []);

    //scroll down

    useEffect(() => {
        if (chatBoxRef.current) {
        chatBoxRef.current.scroll({
            top: chatBoxRef.current.scrollHeight,
            behavior: "smooth",
        });
        }
    }, [messages]);

    //stompClient ko init karne honge
    //subscribe

    // useEffect(() => {
    //     const connectWebSocket = () => {
    //     ///SockJS
    //     const sock = new SockJS(`${baseURL}/chat`);
    //     const client = Stomp.over(sock);

    //     client.connect({}, () => {
    //         setStompClient(client);

    //         toast.success("connected");

    //         client.subscribe(`/topic/room/${roomId}`, (message) => {
    //         console.log(message);

    //         const newMessage = JSON.parse(message.body);

    //         setMessages((prev) => [...prev, newMessage]);

    //         //rest of the work after success receiving the message
    //         });
    //     });
    //     };

    //     if (connected) {
    //     connectWebSocket();
    //     }

    //     //stomp client
    // }, [roomId]);

    //-------

    useEffect(() => {
        const connectWebSocket = () => {
            // Initialize SockJS and STOMP client
            const sock = new SockJS(`${baseURL}/chat`);
            const client = Stomp.over(sock);
    
            client.connect({}, () => {
                setStompClient(client); // Set the client after a successful connection
                toast.success("Connected to WebSocket");
    
                // Subscribe to the topic for the specific room
                client.subscribe(`/topic/room/${roomId}`, (message) => {
                    console.log("Received message:", message);
                    const newMessage = JSON.parse(message.body);
                    setMessages((prev) => [...prev, newMessage]);
                });
            });
    
            return client;
        };
    
        if (connected) {
            const client = connectWebSocket();
    
            // Cleanup function to avoid multiple subscriptions
            return () => {
                if (client) {
                    client.disconnect();
                    console.log("WebSocket disconnected");
                }
            };
        }
    }, [roomId, connected]);
    

    //--------


    //send message handle

    const sendMessage = async () => {
        if (stompClient && connected && input.trim()) {
        console.log(input);

        const message = {
            sender: currentUser,
            content: input,
            roomId: roomId,
        };

        stompClient.send(
            `/app/sendMessage/${roomId}`,
            {},
            JSON.stringify(message)
        );
        setInput("");
        }

        //
    };

    function handleLogout() {
        stompClient.disconnect();
        setConnected(false);
        setRoomId("");
        setCurrentUser("");
        navigate("/");
    }


  return (
    <div className="">
        {/* This is Header */}
         <header className="dark:border-gray-700  fixed w-full dark:bg-gray-900 py-5 shadow flex justify-around items-center">

             {/* chat room name container */}
             <div>
                 <h1 className="font-semibold text-xl">
                     Room: <span>{roomId}</span>
                 </h1>
             </div>

             {/* username container */}
             <div>
                 <h1 className="font-semibold text-xl">
                     User: <span>{currentUser}</span>
                 </h1>
             </div>

             {/* button: Leave Room  */}
             <div>
                 <button 
                 onClick={handleLogout}
                 className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full">Leave Room</button>
             </div>

         </header>
        



        {/* Main messages */}
        <main className="py-20 px-10   w-2/3 dark:bg-slate-600 mx-auto h-screen overflow-auto ">
            {
                messages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === currentUser ? "justify-end" : "justify-start"}`}>
                        
                        <div className={`my-2 ${message.sender === currentUser ? 'bg-gray-700' : 'bg-blue-800'} p-2 max-w-xs rounded`}>
                            <div className="flex flex-row gap-2">
                            <img
                                className="h-10 w-10"
                                src={"https://avatar.iran.liara.run/public/45"}
                                alt=""
                            />
                                <div className="flex flex-col gap-1" >

                                    <p className="text-sm font-bold">{message.sender}</p>
                                    <p>{message.content}</p>
                                    <p className="text-xs text-gray-400">
                                        {timeAgo(message.timeStamp)}
                                    </p>
                                </div>
                            </div>

                        </div>
                
                    </div>
                ))
            }
        </main>






        {/* Input Message container */}
         <div className="fixed bottom-4 w-full h-16" >
             <div className="h-full  pr-3 gap-4 flex items-center justify-between rounded-full w-1/2 mx-auto dark:bg-gray-900">
                 <input 
                    value={input}
                    onChange={(e) => {
                    setInput(e.target.value);
                    }}
                    onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        sendMessage();
                    }
                    }}
                 type="text"
                         placeholder="Type your message here..."
                         className=" w-full  dark:border-gray-600 b dark:bg-gray-800  px-5 py-2 rounded-full h-full focus:outline-none  " 
                 />
                 <div className="flex gap-1">
                     <button 
                         className="dark:bg-gray-600 h-10 w-10  flex   justify-center items-center rounded-full">
                         <MdAttachFile size={30}/>
                     </button>

                     <button 
                        onClick={sendMessage}
                        className="dark:bg-gray-600 h-10 w-10  flex   justify-center items-center rounded-full">
                        <FaCircleArrowUp size={30}/>
                     </button>
                 </div>

             </div>

         </div>

    </div>
  )
}

export default ChatPage