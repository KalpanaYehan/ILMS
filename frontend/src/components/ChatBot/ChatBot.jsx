import React, { useState, useEffect } from 'react';

const ChatBot = () => {

    const chatbotId = "DIGkr4wGY4U2Btx8hIx6l";
    const [chatBubbleVisible, setChatBubbleVisible] = useState(false);

    const handleChatBubbleClick = () => setChatBubbleVisible(!chatBubbleVisible);

    useEffect(() => {
        window.addEventListener('chatbase:chatbubble:click', handleChatBubbleClick);

        return () => window.removeEventListener('chatbase:chatbubble:click', handleChatBubbleClick);
    }, [chatbotId]);

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 20 }}>
            <div className="relative z-10 gap-10 mx-auto max-w-7xl pt-14 sm:grid-cols-2 lg:grid-cols-3">
                <a href={handleChatBubbleClick} className='z-20 duration-200 hover:text-white hover:scale-110'>
                    <div className="relative flex flex-col gap-4 px-0 py-4 mx-4 shadow-lg rounded-xl bg-primary/20">
                        <div className="mb-1">
                            <img
                                src='https://img.freepik.com/free-photo/cartoon-ai-robot-scene_23-2151675020.jpg?t=st=1724961481~exp=1724965081~hmac=e6c47d470ae93ee38d62de8cf094f688bd119e00a8114b9e742e211e69fb3f81&w=1060'
                                alt=""
                                className="mx-auto rounded-xl h-28"
                            />
                        </div>
                        {/* content section */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="px-3 space-y-3">
                                <h1 className="text-2xl font-bold text-center text-black/80 font-cursive2">
                                    <button className='z-20 px-3 py-2 font-semibold text-white rounded-lg shadow-md bg-primary'
                                        onClick={handleChatBubbleClick}
                                    >
                                        Ask from chatbot
                                    </button>
                                </h1>
                                <p className="text-sm text-center text-gray-600">Ask your problems for quick solutions.</p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            {chatBubbleVisible && (
                <div style={{ position: 'absolute', bottom: '0', right: '0', transform: 'translateY(-70%)', zIndex: 30 }}>
                    <iframe
                        src={`https://www.chatbase.co/chatbot-iframe/${chatbotId}`}
                        style={{ width: '350px', height: '400px', border: 'none' }}
                        title="Chatbot"
                    />
                </div>
            )}
        </div>
    );
};

export default ChatBot;
