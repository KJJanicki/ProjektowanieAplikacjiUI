import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import MainLayout from './components/MainLayout.js';
import SwipeDeck from './components/SwipeDeck.js';
import ChatInterface from './components/ChatInterface.js';
import ProfilePage from './pages/ProfilePage.js';

const App = () => {
    const [activeTab, setActiveTab] = useState('swipe');

    // Global Theme Initialization
    React.useEffect(() => {
        const checkTheme = () => {
            try {
                const saved = localStorage.getItem('aura_settings');
                if (saved) {
                    const settings = JSON.parse(saved);
                    if (!settings.darkMode) {
                        document.body.classList.add('light-mode');
                    } else {
                        document.body.classList.remove('light-mode');
                    }
                }
            } catch (e) {
                console.error("Theme init error", e);
            }
        };

        // Check immediately
        checkTheme();

        // Listen for storage changes (optional, helps if multiple tabs)
        window.addEventListener('storage', checkTheme);
        return () => window.removeEventListener('storage', checkTheme);
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case 'swipe': return React.createElement(SwipeDeck);
            case 'chat': return React.createElement(ChatInterface);
            case 'profile': return React.createElement(ProfilePage);
            default: return React.createElement(SwipeDeck);
        }
    };

    return React.createElement(
        MainLayout,
        { activeTab, onTabChange: setActiveTab },
        renderContent()
    );
};

const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App));
