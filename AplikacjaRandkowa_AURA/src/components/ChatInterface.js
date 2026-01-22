import React, { useState, useEffect, useRef } from 'react';
import { mockUsers } from '../data/mockUsers.js';

const ChatInterface = () => {
    const [activeChat, setActiveChat] = useState(null); // ID of user chatting with
    const [messages, setMessages] = useState({}); // Map of userId -> Array of messages

    // Initialize some mock chats
    useEffect(() => {
        setMessages({
            1: [
                { id: 1, sender: 'them', text: 'Hey! I allow myself to be the first one to write. 🎮' },
            ],
            2: [
                { id: 1, sender: 'them', text: 'Nice photos!' }
            ]
        });
    }, []);

    const sendMessage = (text) => {
        if (!text.trim()) return;

        const newMsg = { id: Date.now(), sender: 'me', text };
        setMessages(prev => ({
            ...prev,
            [activeChat]: [...(prev[activeChat] || []), newMsg]
        }));

        // Bot Logic
        setTimeout(() => {
            const botResponses = [
                "That's interesting! Tell me more.",
                "Haha, totally! 😄",
                "I was thinking the same thing.",
                "What are you up to this weekend?",
                "Nice to meet you properly!",
                "Are you always this charming? 😉"
            ];
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

            const botMsg = { id: Date.now() + 1, sender: 'them', text: randomResponse };
            setMessages(prev => ({
                ...prev,
                [activeChat]: [...(prev[activeChat] || []), botMsg]
            }));
        }, 1500);
    };

    if (activeChat) {
        const user = mockUsers.find(u => u.id === activeChat) || mockUsers[0];
        return React.createElement(ChatWindow, {
            user,
            messages: messages[activeChat] || [],
            onBack: () => setActiveChat(null),
            onSend: sendMessage
        });
    }

    return React.createElement(MatchList, {
        matches: mockUsers.slice(0, 3), // Just mock first 3 are matches
        onSelect: (id) => setActiveChat(id)
    });
};

const MatchList = ({ matches, onSelect }) => {
    return React.createElement(
        'div',
        { className: 'chat-list-container' },
        React.createElement('h2', { style: { padding: '24px 24px 0', color: 'white' } }, 'Matches'),
        React.createElement(
            'div',
            { className: 'matches-grid' },
            matches.map(user =>
                React.createElement(
                    'div',
                    { key: user.id, className: 'match-item', onClick: () => onSelect(user.id) },
                    React.createElement('div', {
                        className: 'avatar large',
                        style: { backgroundImage: `url(${user.photos[0]})` }
                    }),
                    React.createElement('span', { className: 'match-name' }, user.name)
                )
            )
        ),
        React.createElement('h3', { style: { padding: '0 24px', color: 'var(--text-muted)' } }, 'Messages'),
        React.createElement(
            'div',
            { className: 'message-list' },
            matches.map(user =>
                React.createElement(
                    'div',
                    { key: user.id, className: 'message-row', onClick: () => onSelect(user.id) },
                    React.createElement('div', {
                        className: 'avatar',
                        style: { backgroundImage: `url(${user.photos[0]})` }
                    }),
                    React.createElement(
                        'div',
                        { className: 'message-preview' },
                        React.createElement('h4', null, user.name),
                        React.createElement('p', null, 'Click to chat...')
                    )
                )
            )
        )
    );
};

const ChatWindow = ({ user, messages, onBack, onSend }) => {
    const [input, setInput] = useState('');
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return React.createElement(
        'div',
        { className: 'chat-window' },
        React.createElement(
            'div',
            { className: 'chat-header glass-panel' },
            React.createElement('button', { className: 'back-btn', onClick: onBack },
                React.createElement('i', { className: 'ph-fill ph-caret-left' })
            ),
            React.createElement('div', {
                className: 'avatar small',
                style: { backgroundImage: `url(${user.photos[0]})` }
            }),
            React.createElement('span', { className: 'chat-user-name' }, user.name)
        ),
        React.createElement(
            'div',
            { className: 'messages-area' },
            messages.map(msg =>
                React.createElement(
                    'div',
                    { key: msg.id, className: `msg-bubble ${msg.sender === 'me' ? 'me' : 'them'}` },
                    msg.text
                )
            ),
            React.createElement('div', { ref: endRef })
        ),
        React.createElement(
            'div',
            { className: 'chat-input-area glass-panel' },
            React.createElement('input', {
                type: 'text',
                value: input,
                onChange: (e) => setInput(e.target.value),
                onKeyPress: (e) => e.key === 'Enter' && (onSend(input), setInput('')),
                placeholder: 'Type a message...'
            }),
            React.createElement('button', {
                className: 'send-btn',
                onClick: () => { onSend(input); setInput(''); }
            }, React.createElement('i', { className: 'ph-fill ph-paper-plane-right' }))
        )
    );
};

const styles = document.createElement('style');
styles.innerHTML = `
    .chat-list-container {
        height: 100%;
        overflow-y: auto;
    }
    .matches-grid {
        display: flex;
        gap: 16px;
        padding: 16px 24px;
        overflow-x: auto;
    }
    .match-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        cursor: pointer;
    }
    .match-name {
        color: white;
        font-size: 14px;
        font-weight: 500;
    }
    .avatar {
        background-size: cover;
        background-position: center;
        border-radius: 50%;
        border: 2px solid var(--primary);
    }
    .avatar.large { width: 64px; height: 64px; }
    .avatar.small { width: 36px; height: 36px; }
    
    .message-list {
        padding: 16px 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .message-row {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        padding: 12px;
        border-radius: var(--radius-md);
        transition: background 0.2s;
    }
    .message-row:hover {
        background: rgba(255,255,255,0.05);
    }
    .message-preview h4 { 
        color: white; 
        margin-bottom: 4px; 
    }
    .message-preview p { 
        color: var(--text-muted); 
        font-size: 14px; 
    }

    /* Chat Window */
    .chat-window {
        height: 100%;
        display: flex;
        flex-direction: column;
        background: var(--bg-dark);
    }
    .chat-header {
        height: 60px;
        display: flex;
        align-items: center;
        padding: 0 16px;
        gap: 12px;
        z-index: 10;
        border-bottom: 1px solid var(--glass-border);
    }
    .back-btn {
        background: transparent;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
    }
    .chat-user-name {
        color: white;
        font-weight: 600;
        font-size: 18px;
    }
    .messages-area {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .msg-bubble {
        max-width: 70%;
        padding: 10px 16px;
        border-radius: 18px;
        font-size: 15px;
        line-height: 1.4;
    }
    .msg-bubble.me {
        align-self: flex-end;
        background: var(--primary);
        color: white;
        border-bottom-right-radius: 4px;
    }
    .msg-bubble.them {
        align-self: flex-start;
        background: #2a2a30;
        color: white;
        border-bottom-left-radius: 4px;
    }
    .chat-input-area {
        padding: 12px;
        display: flex;
        gap: 8px;
        align-items: center;
    }
    .chat-input-area input {
        flex: 1;
        background: rgba(255,255,255,0.1);
        border: none;
        padding: 12px;
        border-radius: var(--radius-full);
        color: white;
        outline: none;
    }
    .send-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        background: var(--primary);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`;
document.head.appendChild(styles);

export default ChatInterface;
