import React, { useContext, useEffect, useState } from 'react';
import Message from './Message';
import { GeneralContext } from '../../context/GeneralContextProvider';

const Messages = () => {
  const { socket, chatData } = useContext(GeneralContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleMessagesUpdated = ({ chat }) => {
      console.log('Messages updated:', chat);
      if (chat) {
        setMessages(chat.messages);
      }
    };

    const handleNewMessage = async (newMessage) => {
      console.log('New message received:', newMessage);
      if (newMessage.chatId === chatData.chatId) {
        setMessages(prevMessages => [...prevMessages, newMessage]);
      }
    };

    socket.on('messages-updated', handleMessagesUpdated);
    socket.on('newNotification', handleNewMessage);

    if (chatData.chatId) {
      socket.emit('update-messages', { chatId: chatData.chatId });
    }

    return () => {
      socket.off('messages-updated', handleMessagesUpdated);
      socket.off('newNotification', handleNewMessage);
    };
  }, [socket, chatData]);

  return (
    <div className='messages'>
      {messages.length > 0 && messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
};

export default Messages;




