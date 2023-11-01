import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { ChatContext } from "../../context/chatContext";

import axios from "axios";

import CreateGroupChat from "./CreateGroupChat";
import CreatePrivateChat from "./CreatePrivateChat";
import NewChatHeader from "./NewChatHeader";

export default function NewChatPopout({togglePopout}) {

  const {token, user} = useContext(AuthContext);
  const { chats, setChats } = useContext(ChatContext);

  const [chatType, setChatType] = useState('private');
  const [stage, setStage] = useState(null);
  const [chatData, setChatData] = useState({
    chatName: '',
    ids: [],
  });

  const handleGroupChat = () => {
    setChatType('group');
    setStage(0);
  }

  const handlePrivateChat = () => {
    setChatType('private');
    setStage(null);
  }

  const createChat = async (privateChatData = null) => {

    try {
      const res = await axios.post('http://localhost:3000/createChat',
        {
          chatName: privateChatData ? privateChatData.chatName : chatData.chatName,
          type: chatType,
          admin: user._id,
          ids : privateChatData ? privateChatData.ids : chatData.ids
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      setChats([...chats, res.data]);
      togglePopout();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="popout-container">
      <NewChatHeader type={chatType} stage={stage} setStage={setStage} cancelGroup={handlePrivateChat} createChat={createChat}/>
      { chatType === 'private' ?
          <CreatePrivateChat createChat={createChat} chatData={chatData} setChatData={setChatData} /> :
          <CreateGroupChat stage={stage} chatData={chatData} setChatData={setChatData}/>
      }
      {
        chatType === 'private' && (
          <div className='creat-group-chat-button-container'>
            <button className='create-group-chat-button' onClick={handleGroupChat}>Create Group Chat</button>
          </div>
        )
      }
      
    </div>
  )
}
