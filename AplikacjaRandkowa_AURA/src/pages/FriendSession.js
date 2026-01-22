import React, { useState, useEffect } from 'react';
import Card from '../components/Card.js';
import { mockUsers } from '../data/mockUsers.js';

const FriendSession = () => {
    const [view, setView] = useState('lobby'); // lobby, session
    const [sessionLink, setSessionLink] = useState('');
    const [vote, setVote] = useState(5);
    const [currentUserIndex, setCurrentUserIndex] = useState(0);

    const startSession = () => {
        // Mock generating a link
        const link = `https://aura.app/party/${Math.random().toString(36).substr(2, 6)}`;
        setSessionLink(link);
        setView('lobby');
    };

    const copyLink = () => {
        navigator.clipboard.writeText(sessionLink);
        alert('Link copied to clipboard!');
        // Auto start for demo
        setView('session');
    };

    const handleVote = (val) => {
        console.log(`Voted ${val}/10 for ${mockUsers[currentUserIndex].name}`);
        if (currentUserIndex < mockUsers.length - 1) {
            setCurrentUserIndex(prev => prev + 1);
            setVote(5);
        } else {
            alert('Session Complete!');
            setView('lobby');
        }
    };

    if (view === 'lobby' && !sessionLink) {
        return React.createElement(
            'div',
            { className: 'friend-container centered' },
            React.createElement('div', { className: 'icon-circle' },
                React.createElement('i', { className: 'ph-fill ph-users-three' })
            ),
            React.createElement('h2', null, 'Scroll with Friends'),
            React.createElement('p', null, 'Generate a link to let your friends vote on who you should date.'),
            React.createElement('button', { className: 'btn-primary', onClick: startSession }, 'Create Party')
        );
    }

    if (view === 'lobby' && sessionLink) {
        return React.createElement(
            'div',
            { className: 'friend-container centered' },
            React.createElement('h2', null, 'Party Ready!'),
            React.createElement('p', null, 'Share this link with your friends:'),
            React.createElement('div', { className: 'link-box' }, sessionLink),
            React.createElement('button', { className: 'btn-primary', onClick: copyLink }, 'Copy & Start')
        );
    }

    // Session View (Voting)
    const user = mockUsers[currentUserIndex];
    return React.createElement(
        'div',
        { className: 'friend-container' },
        React.createElement(
            'div',
            { className: 'vote-header' },
            React.createElement('h3', null, `Voting on ${user.name}`),
            React.createElement('span', { className: 'vote-count' }, `${currentUserIndex + 1}/${mockUsers.length}`)
        ),

        // Simplified Card View (static)
        React.createElement(
            'div',
            { className: 'static-card-wrapper' },
            React.createElement(Card, { user: user })
        ),

        // Voting Controls
        React.createElement(
            'div',
            { className: 'vote-controls glass-panel' },
            React.createElement('span', { className: 'vote-label' }, `Score: ${vote}`),
            React.createElement('input', {
                type: 'range',
                min: '1',
                max: '10',
                value: vote,
                onChange: (e) => setVote(parseInt(e.target.value)),
                className: 'vote-slider'
            }),
            React.createElement('button', { className: 'btn-primary', onClick: () => handleVote(vote) }, 'Submit Vote')
        )
    );
};

const styles = document.createElement('style');
styles.innerHTML = `
    .friend-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 24px;
        color: white;
    }
    .friend-container.centered {
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 16px;
    }
    .icon-circle {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        margin-bottom: 24px;
        box-shadow: 0 10px 30px rgba(255, 107, 129, 0.4);
    }
    .link-box {
        background: rgba(255,255,255,0.1);
        padding: 12px;
        border-radius: var(--radius-sm);
        font-family: monospace;
        margin-bottom: 16px;
        word-break: break-all;
    }
    .vote-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }
    .static-card-wrapper {
        flex: 1;
        position: relative;
        border-radius: var(--radius-lg);
        overflow: hidden;
        margin-bottom: 140px; /* Space for controls */
    }
    .vote-controls {
        position: absolute;
        bottom: 90px;
        left: 20px;
        right: 20px;
        padding: 20px;
        border-radius: var(--radius-md);
        display: flex;
        flex-direction: column;
        gap: 16px;
        z-index: 100;
    }
    .vote-label {
        font-size: 24px;
        font-weight: 700;
        text-align: center;
        color: var(--secondary);
    }
    .vote-slider {
        width: 100%;
    }
`;
document.head.appendChild(styles);

export default FriendSession;
