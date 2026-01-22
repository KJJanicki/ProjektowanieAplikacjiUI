import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { currentUser } from '../data/mockUsers.js';

// Sub-components can be internal for simplicity
const StatCard = ({ icon, count, label, color }) => (
    React.createElement('div', { className: 'stat-card glass-panel' },
        React.createElement('div', { className: 'stat-icon', style: { color: color } },
            React.createElement('i', { className: `ph-fill ph-${icon}` })
        ),
        React.createElement('span', { className: 'stat-count' }, count),
        React.createElement('span', { className: 'stat-label' }, label)
    )
);

const SettingItem = ({ icon, label, hasArrow = true, isToggle = false, value, onToggle }) => (
    React.createElement('div', { className: 'setting-item' },
        React.createElement('div', { className: 'setting-left' },
            React.createElement('div', { className: 'setting-icon' },
                React.createElement('i', { className: `ph ph-${icon}` })
            ),
            React.createElement('span', null, label)
        ),
        isToggle
            ? React.createElement('div', {
                className: `toggle-switch ${value ? 'active' : ''}`,
                onClick: onToggle
            }, React.createElement('div', { className: 'toggle-knob' }))
            : hasArrow && React.createElement('i', { className: 'ph-bold ph-caret-right arrow' })
    )
);

const ProfileDashboard = ({ onEdit, onFriendMode, onSettings, onShowReviews }) => {
    // Mock Toggles
    const [toggles, setToggles] = useState({ notifications: true, distance: true, promo: true });

    const toggle = (key) => setToggles(p => ({ ...p, [key]: !p[key] }));

    return React.createElement(
        'div',
        { className: 'dashboard-container' },

        // Header
        React.createElement('div', { className: 'dashboard-header' },
            React.createElement('div', { className: 'logo-area' },
                React.createElement('i', { className: 'ph-fill ph-fire', style: { color: 'var(--primary)', fontSize: 24 } }),
                React.createElement('h1', null, 'Aura')
            ),
            React.createElement('button', { className: 'settings-btn', onClick: onSettings },
                React.createElement('i', { className: 'ph ph-gear' })
            )
        ),

        // Premium Banner
        React.createElement('div', { className: 'premium-banner' },
            React.createElement('div', { className: 'banner-content' },
                React.createElement('div', { className: 'crown-icon' }, React.createElement('i', { className: 'ph-fill ph-crown' })),
                React.createElement('h2', null, 'Aura Premium'),
                React.createElement('p', null, 'Unlimited Likes, Super Likes, Boosts and more!'),
                React.createElement('button', { className: 'try-btn' }, 'Try for Free')
            ),
            React.createElement('div', { className: 'banner-bg-circle' })
        ),

        // Stats Grid
        React.createElement('div', { className: 'stats-grid' },
            React.createElement(StatCard, { icon: 'heart', count: 24, label: 'Likes', color: '#2ed573' }),
            React.createElement(StatCard, { icon: 'star', count: 5, label: 'Super Likes', color: '#3742fa' }),
            React.createElement(StatCard, { icon: 'lightning', count: 3, label: 'Boosts', color: '#a55eea' })
        ),

        // Menu Sections
        React.createElement('div', { className: 'menu-group glass-panel' },
            React.createElement('div', { className: 'menu-header' }, 'Account'),
            // Fixed: Removed duplicate. Keeping the functional one.
            React.createElement('div', { className: 'setting-item', onClick: onEdit, style: { cursor: 'pointer' } },
                React.createElement('div', { className: 'setting-left' },
                    React.createElement('div', { className: 'setting-icon' }, React.createElement('i', { className: `ph ph-pencil-simple` })),
                    React.createElement('span', null, 'Edit Profile')
                ),
                React.createElement('i', { className: 'ph-bold ph-caret-right arrow' })
            ),
            React.createElement(SettingItem, { icon: 'shield-check', label: 'Safety & Privacy' }),
            React.createElement(SettingItem, { icon: 'bell', label: 'Notifications' })
        ),

        // Feature Link for Friend Mode
        React.createElement('div', { className: 'menu-group glass-panel', onClick: onFriendMode, style: { cursor: 'pointer' } },
            React.createElement('div', { className: 'setting-item' },
                React.createElement('div', { className: 'setting-left' },
                    React.createElement('div', { className: 'setting-icon', style: { color: 'var(--secondary)' } }, React.createElement('i', { className: `ph-fill ph-users-three` })),
                    React.createElement('span', { style: { fontWeight: 600, color: 'var(--secondary)' } }, 'Scroll with Friends')
                ),
                React.createElement('i', { className: 'ph-bold ph-caret-right arrow' })
            )
        ),

        React.createElement('div', { className: 'menu-group glass-panel' },
            React.createElement('div', { className: 'menu-header' }, 'Settings'),
            React.createElement(SettingItem, { icon: 'globe', label: 'Show Distance', isToggle: true, value: toggles.distance, onToggle: () => toggle('distance') }),
            React.createElement(SettingItem, { icon: 'fire', label: 'Promotions', isToggle: true, value: toggles.promo, onToggle: () => toggle('promo') })
        ),

        React.createElement('div', { style: { height: 100 } }) // Spacer
    );
};

// Moving internal component onclick logic out for simplicity in previous step, enforcing simple structure
const styles = document.createElement('style');
styles.innerHTML = `
    .dashboard-container {
        padding: 24px;
        height: 100%;
        overflow-y: auto;
        padding-bottom: 100px;
    }
    .dashboard-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }
    .logo-area { display: flex; gap: 8px; align-items: center; }
    .logo-area h1 { font-size: 24px; font-weight: 700; color: var(--primary); margin: 0; }
    .settings-btn { background: transparent; border: none; color: white; font-size: 24px; cursor: pointer; }
    
    .safety-badge-btn {
        background: rgba(46, 213, 115, 0.15);
        color: #2ed573;
        border: 1px solid rgba(46, 213, 115, 0.3);
        padding: 6px 12px;
        border-radius: var(--radius-full);
        display: flex; align-items: center; gap: 6px;
        font-weight: 700; cursor: pointer; font-size: 14px;
    }

    .premium-banner {
        background: linear-gradient(135deg, #ff6b81, #ff4757);
        border-radius: var(--radius-lg);
        padding: 24px;
        position: relative;
        overflow: hidden;
        margin-bottom: 24px;
        box-shadow: 0 10px 20px rgba(255, 71, 87, 0.3);
    }
    .banner-content { position: relative; z-index: 2; color: white; }
    .crown-icon { font-size: 32px; margin-bottom: 8px; }
    .banner-content h2 { font-size: 20px; margin-bottom: 4px; }
    .banner-content p { font-size: 13px; opacity: 0.9; margin-bottom: 16px; max-width: 80%; }
    .try-btn { 
        background: white; color: #ff4757; border: none; 
        padding: 8px 16px; border-radius: var(--radius-full); 
        font-weight: 600; cursor: pointer;
    }
    .banner-bg-circle {
        position: absolute;
        width: 150px; height: 150px;
        background: rgba(255,255,255,0.1);
        border-radius: 50%;
        top: -40px; right: -40px;
        z-index: 1;
    }

    .stats-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 24px; }
    .stat-card {
        padding: 16px; display: flex; flex-direction: column; align-items: center; gap: 8px;
        background: white; /* Light theme card from ref design */
        color: #1a1a1f;
        background: #1e1e24; /* Keeping dark theme consistent */
        color: white;
    }
    .stat-icon { font-size: 24px; }
    .stat-count { font-size: 18px; font-weight: 700; }
    .stat-label { font-size: 12px; color: var(--text-muted); }

    .menu-group {
        background: #1a1a1f; 
        border-radius: var(--radius-md);
        overflow: hidden;
        margin-bottom: 16px;
        border: 1px solid var(--glass-border);
    }
    .menu-header {
        padding: 12px 16px; font-size: 14px; font-weight: 600; 
        color: var(--primary); border-bottom: 1px solid var(--glass-border);
    }
    .setting-item {
        display: flex; justify-content: space-between; align-items: center;
        padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.05);
        cursor: pointer;
    }
    .setting-item:last-child { border-bottom: none; }
    .setting-left { display: flex; align-items: center; gap: 12px; }
    .setting-icon { color: var(--text-muted); font-size: 20px; }
    .arrow { color: var(--text-muted); font-size: 16px; }

    /* Toggle Switch */
    .toggle-switch {
        width: 44px; height: 24px; background: rgba(255,255,255,0.2);
        border-radius: 12px; position: relative; cursor: pointer; transition: background 0.2s;
    }
    .toggle-switch.active { background: var(--primary); }
    .toggle-knob {
        width: 20px; height: 20px; background: white; border-radius: 50%;
        position: absolute; top: 2px; left: 2px; transition: left 0.2s;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .toggle-switch.active .toggle-knob { left: 22px; }
`;
document.head.appendChild(styles);

export default ProfileDashboard;
