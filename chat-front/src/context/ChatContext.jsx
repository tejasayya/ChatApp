// import { createContext, useContext, useState } from "react";
// import PropTypes from 'prop-types';

// const ChatContext = createContext();

// export const ChatProvider = ({ children }) => {
//   const [roomId, setRoomId] = useState("");
//   const [currentUser, setCurrentUser] = useState("");
//   const [connected, setConnected] = useState(false);

//   return (
//     <ChatContext.Provider
//       value={{
//         roomId,
//         currentUser,
//         connected,
//         setRoomId,
//         setCurrentUser,
//         setConnected,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };
// ChatProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// const useChatContext = () => useContext(ChatContext);
// export default useChatContext;

//--------------------------------------------

import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [roomId, setRoomId] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [connected, setConnected] = useState(false);

  return (
    <ChatContext.Provider
      value={{
        roomId,
        currentUser,
        connected,
        setRoomId,
        setCurrentUser,
        setConnected,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => useContext(ChatContext);
export default useChatContext;