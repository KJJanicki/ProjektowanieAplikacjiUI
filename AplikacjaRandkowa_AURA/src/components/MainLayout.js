import React from 'react';

const MainLayout = ({ children, activeTab, onTabChange }) => {
    return React.createElement(
        'div',
        { className: 'app-container' },
        React.createElement(
            'div',
            { className: 'content-area' },
            children
        ),
        React.createElement(
            'nav',
            { className: 'bottom-nav glass-panel' },
            React.createElement(NavButton, {
                icon: 'fire',
                isActive: activeTab === 'swipe',
                onClick: () => onTabChange('swipe')
            }),
            React.createElement(NavButton, {
                icon: 'chats-circle',
                isActive: activeTab === 'chat',
                onClick: () => onTabChange('chat')
            }),
            React.createElement(NavButton, {
                icon: 'user',
                isActive: activeTab === 'profile',
                onClick: () => onTabChange('profile')
            })
        )
    );
};

const NavButton = ({ icon, isActive, onClick }) => {
    return React.createElement(
        'button',
        {
            className: `nav-btn ${isActive ? 'active' : ''}`,
            onClick: onClick
        },
        React.createElement('i', { className: `ph ph-${icon}`, style: { fontSize: '24px' } })
    );
};

// Add styles programmatically for simplicity in this file, or we can move to css
const styles = document.createElement('style');
styles.innerHTML = `
    .app-container {
        width: 100%;
        max-width: 480px;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        background: black;
        box-shadow: 0 0 50px rgba(0,0,0,0.5);
    }
    @media (min-width: 500px) {
        .app-container {
            height: 90vh;
            border-radius: 32px;
            overflow: hidden;
            border: 1px solid var(--glass-border);
        }
    }
    .content-area {
        flex: 1;
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: column;
    }
    .bottom-nav {
        height: 70px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding-bottom: env(safe-area-inset-bottom);
        z-index: 100;
    }
    .nav-btn {
        background: transparent;
        border: none;
        color: var(--text-muted);
        padding: 12px;
        border-radius: 50%;
        transition: all 0.3s;
        cursor: pointer;
    }
    .nav-btn.active {
        color: var(--primary);
        background: rgba(255, 255, 255, 0.05);
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(255, 107, 107, 0.2);
    }
`;
document.head.appendChild(styles);

export default MainLayout;
