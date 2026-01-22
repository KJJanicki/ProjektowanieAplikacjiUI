import React, { useState } from 'react';

const SettingsPage = ({ onBack }) => {
    // Mock settings
    const [settings, setSettings] = useState({
        darkMode: true,
        metric: true,
        sound: false,
        activeStatus: true,
        emailNotifs: true,
        pushNotifs: true
    });

    const toggle = (key) => {
        setSettings(s => {
            const newState = { ...s, [key]: !s[key] };

            // Light Mode Logic
            if (key === 'darkMode') {
                const root = document.documentElement;
                if (!newState.darkMode) {
                    // Switch to Light
                    root.style.setProperty('--bg-dark', '#ffffff');
                    root.style.setProperty('--glass', 'rgba(0, 0, 0, 0.05)');
                    root.style.setProperty('--glass-border', 'rgba(0, 0, 0, 0.1)');
                    root.style.setProperty('--text-muted', '#666');
                    // We might need to handle white text turning black globally
                    // This is a quick hack for the demo; proper implementation needs generic variables (e.g., --bg-surface, --text-main)
                    // But for this specific codebase, we can override keys.

                    const style = document.createElement('style');
                    style.id = 'light-mode-override';
                    style.innerHTML = `
                        body, h1, h2, h3, h4, span, div { color: #1a1a1f; }
                        .glass-panel { background: rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.1); }
                        .settings-header h2, .edit-header h2, .section-title { color: #1a1a1f !important; }
                        .setting-row { color: #1a1a1f; border-bottom: 1px solid rgba(0,0,0,0.1); }
                        .back-btn { color: #1a1a1f; }
                        input, textarea { color: #1a1a1f !important; }
                        .filter-content { background: white; }
                        .filter-header h3 { color: #1a1a1f !important; }
                         .close-btn { color: #1a1a1f !important; }
                         .filter-section h4 { color: #1a1a1f !important; }
                    `;
                    document.head.appendChild(style);
                } else {
                    // Switch back to Dark
                    root.style.removeProperty('--bg-dark');
                    root.style.removeProperty('--glass');
                    root.style.removeProperty('--glass-border');
                    root.style.removeProperty('--text-muted');
                    const override = document.getElementById('light-mode-override');
                    if (override) override.remove();
                }
            }

            return newState;
        });
    };

    return React.createElement(
        'div',
        { className: 'settings-container' },

        // Header
        React.createElement('div', { className: 'settings-header' },
            React.createElement('button', { className: 'back-btn', onClick: onBack },
                React.createElement('i', { className: 'ph-bold ph-arrow-left' })
            ),
            React.createElement('h2', null, 'Settings')
        ),

        // Content
        React.createElement('div', { className: 'settings-content' },

            // App Appearance
            React.createElement('h3', { className: 'settings-section-title' }, 'Appearance'),
            React.createElement('div', { className: 'settings-group glass-panel' },
                React.createElement(SettingRow, {
                    label: 'Dark Mode',
                    isToggle: true,
                    value: settings.darkMode,
                    onToggle: () => toggle('darkMode')
                })
            ),

            // Preferences
            React.createElement('h3', { className: 'settings-section-title' }, 'Preferences'),
            React.createElement('div', { className: 'settings-group glass-panel' },
                React.createElement(SettingRow, {
                    label: 'Distance in km',
                    isToggle: true,
                    value: settings.metric,
                    onToggle: () => toggle('metric')
                }),
                React.createElement(SettingRow, {
                    label: 'Sound Effects',
                    isToggle: true,
                    value: settings.sound,
                    onToggle: () => toggle('sound')
                }),
                React.createElement(SettingRow, {
                    label: 'Show Active Status',
                    isToggle: true,
                    value: settings.activeStatus,
                    onToggle: () => toggle('activeStatus')
                })
            ),

            // Notifications
            React.createElement('h3', { className: 'settings-section-title' }, 'Notifications'),
            React.createElement('div', { className: 'settings-group glass-panel' },
                React.createElement(SettingRow, {
                    label: 'Email Notifications',
                    isToggle: true,
                    value: settings.emailNotifs,
                    onToggle: () => toggle('emailNotifs')
                }),
                React.createElement(SettingRow, {
                    label: 'Push Notifications',
                    isToggle: true,
                    value: settings.pushNotifs,
                    onToggle: () => toggle('pushNotifs')
                })
            ),

            // Account Actions
            React.createElement('h3', { className: 'settings-section-title' }, 'More'),
            React.createElement('div', { className: 'settings-group glass-panel' },
                React.createElement('div', { className: 'setting-row', style: { color: 'var(--primary)' } }, 'Restore Purchases'),
                React.createElement('div', { className: 'setting-row', style: { color: '#ff4757' } }, 'Logout'),
                React.createElement('div', { className: 'setting-row', style: { color: '#ff4757' } }, 'Delete Account')
            ),

            React.createElement('p', {
                style: { textAlign: 'center', marginTop: '32px', color: 'var(--text-muted)', fontSize: '13px' }
            }, 'Aura Version 1.0.0')
        )
    );
};

const SettingRow = ({ label, isToggle, value, onToggle }) => (
    React.createElement('div', { className: 'setting-row' },
        React.createElement('span', null, label),
        isToggle && React.createElement('div', {
            className: `toggle-switch ${value ? 'active' : ''}`,
            onClick: onToggle
        }, React.createElement('div', { className: 'toggle-knob' }))
    )
);

const styles = document.createElement('style');
styles.innerHTML = `
    .settings-container {
        height: 100%;
        background: var(--bg-dark);
        display: flex;
        flex-direction: column;
    }
    .settings-header {
        padding: 16px 24px;
        display: flex;
        align-items: center;
        gap: 16px;
        border-bottom: 1px solid var(--glass-border);
    }
    .settings-header h2 { color: white; font-size: 20px; font-weight: 600; }
    .settings-header .back-btn {
        background: transparent; border: none; color: white; font-size: 24px; cursor: pointer;
    }
    
    .settings-content {
        flex: 1;
        overflow-y: auto;
        padding: 24px;
        padding-bottom: 100px;
    }
    .settings-section-title {
        font-size: 14px;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 12px;
        margin-top: 24px;
        font-weight: 600;
    }
    .settings-section-title:first-child { margin-top: 0; }
    
    .settings-group {
        border-radius: var(--radius-md);
        overflow: hidden;
        margin-bottom: 12px;
    }
    .setting-row {
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        color: white;
        font-size: 15px;
    }
    .setting-row:last-child { border-bottom: none; }

    /* Light Mode Overrides */
    body.light-mode {
        --bg-dark: #f0f2f5;
        --glass: rgba(255,255,255,0.7);
        --glass-border: rgba(0,0,0,0.1);
        --text-muted: #666;
        color: #1a1a1f;
    }
    body.light-mode .glass-panel {
        background: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    body.light-mode h1,
    body.light-mode h2,
    body.light-mode h3,
    body.light-mode h4,
    body.light-mode h5,
    body.light-mode div,
    body.light-mode span,
    body.light-mode p,
    body.light-mode input,
    body.light-mode textarea,
    body.light-mode button,
    body.light-mode i {
        color: #1a1a1f; 
    }
    /* Revert specific items that need to be white or other colors */
    body.light-mode .btn-primary { color: white !important; }
    body.light-mode .action-btn { color: white !important; }
    body.light-mode .stat-label { color: #666 !important; }
    body.light-mode .stat-card { background: white !important; }
    body.light-mode .active .toggle-knob { background: white !important; }
    body.light-mode .toggle-knob { background: white !important; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    body.light-mode .toggle-switch { background: rgba(0,0,0,0.1) !important; }
    body.light-mode .toggle-switch.active { background: var(--primary) !important; }
    body.light-mode .active i { color: white !important; }
    
    /* Exceptions */
    body.light-mode .settings-container { background: #f0f2f5; }
    body.light-mode .edit-container { background: #f0f2f5; }
    body.light-mode .profile-info { background: white; }
    body.light-mode .banner-content, body.light-mode .banner-content h2, body.light-mode .banner-content p { color: white !important; }
`;
document.head.appendChild(styles);

export default SettingsPage;
