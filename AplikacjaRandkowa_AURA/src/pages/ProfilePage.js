import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileDashboard from '../components/ProfileDashboard.js';
import ProfileEdit from '../components/ProfileEdit.js';
import FriendSession from './FriendSession.js';
import SettingsPage from './SettingsPage.js';

const ProfilePage = () => {
    // states: 'dashboard', 'edit', 'friends', 'settings'
    const [view, setView] = useState('dashboard');

    return React.createElement(
        AnimatePresence,
        { mode: 'wait' },

        view === 'dashboard' && React.createElement(
            motion.div,
            {
                key: 'dashboard',
                initial: { opacity: 0, x: -50 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -50 },
                style: { height: '100%' }
            },
            React.createElement(ProfileDashboard, {
                onEdit: () => setView('edit'),
                onFriendMode: () => setView('friends'),
                onSettings: () => setView('settings')
            })
        ),

        view === 'edit' && React.createElement(
            motion.div,
            {
                key: 'edit',
                initial: { opacity: 0, x: 300 }, // Slide in from right
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: 300 },
                style: { height: '100%', position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 200, background: 'var(--bg-dark)' }
            },
            React.createElement(ProfileEdit, {
                onBack: () => setView('dashboard')
            })
        ),

        view === 'settings' && React.createElement(
            motion.div,
            {
                key: 'settings',
                initial: { opacity: 0, x: 300 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: 300 },
                style: { height: '100%', position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 200 }
            },
            React.createElement(SettingsPage, {
                onBack: () => setView('dashboard')
            })
        ),

        view === 'friends' && React.createElement(
            motion.div,
            {
                key: 'friends',
                initial: { opacity: 0, x: 300 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: 300 },
                style: { height: '100%', position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 200, background: 'var(--bg-dark)' }
            },
            React.createElement(
                'div',
                { style: { height: '100%', position: 'relative' } },
                React.createElement(
                    'button',
                    {
                        onClick: () => setView('dashboard'),
                        style: { position: 'absolute', top: 20, left: 20, zIndex: 300, padding: 8, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: 'white', cursor: 'pointer', backdropFilter: 'blur(4px)' }
                    },
                    React.createElement('i', { className: 'ph-bold ph-arrow-left', style: { fontSize: 24 } })
                ),
                React.createElement(FriendSession)
            )
        )
    );
};

export default ProfilePage;
