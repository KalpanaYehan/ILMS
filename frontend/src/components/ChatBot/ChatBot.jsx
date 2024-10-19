import React, { useState, useEffect } from 'react';

const ChatBot = () => {

    const chatbotId = "DIGkr4wGY4U2Btx8hIx6l"
    const [chatBubbleVisible, setChatBubbleVisible] = useState(false);

    const handleChatBubbleClick = () => setChatBubbleVisible(!chatBubbleVisible);

    useEffect(() => {
        window.addEventListener('chatbase:chatbubble:click', handleChatBubbleClick);

        return () => window.removeEventListener('chatbase:chatbubble:click', handleChatBubbleClick);
    }, [chatbotId]);

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            <button className='font-semibold rounded-lg shadow-md'
                onClick={handleChatBubbleClick}
               
            >
                <img src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg" alt="chatbot" className='rounded-full w-16 h-16'/>
            </button>
            {chatBubbleVisible && (
                <iframe
                    src={`https://www.chatbase.co/chatbot-iframe/${chatbotId}`}
                    style={{  width: '350px', height: '400px', position: 'absolute', bottom: '50px', right: '20px', border: 'none' }}
                    title="Chatbot"
                />
            )}
        </div>
    );
};

export default ChatBot;