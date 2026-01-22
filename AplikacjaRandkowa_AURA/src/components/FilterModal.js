import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterModal = ({ onClose, onApply }) => {
    // State for filters
    const [gender, setGender] = useState('all'); // women, men, all
    const [ageRange, setAgeRange] = useState({ min: 18, max: 35 });
    const [distance, setDistance] = useState(50);
    const [intention, setIntention] = useState('fun'); // serious, fun, open

    const handleApply = () => {
        onApply({ gender, ageRange, distance, intention });

        // Dynamic Theme Logic
        const root = document.documentElement;
        if (intention === 'serious') {
            root.style.setProperty('--primary-h', '340'); // Red/Pink
            root.style.setProperty('--primary-s', '90%');
            root.style.setProperty('--primary-l', '60%');
            root.style.setProperty('--secondary-h', '320');
        } else if (intention === 'fun') {
            root.style.setProperty('--primary-h', '150'); // Green
            root.style.setProperty('--primary-s', '80%');
            root.style.setProperty('--primary-l', '50%');
            root.style.setProperty('--secondary-h', '170');
        } else if (intention === 'open') {
            root.style.setProperty('--primary-h', '30'); // Orange
            root.style.setProperty('--primary-s', '100%');
            root.style.setProperty('--primary-l', '60%');
            root.style.setProperty('--secondary-h', '10');
        }

        onClose();
    };

    return React.createElement(
        AnimatePresence,
        null,
        React.createElement(
            motion.div,
            {
                className: 'filter-overlay',
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 }
            },
            React.createElement(
                motion.div,
                {
                    className: 'filter-content glass-panel',
                    initial: { x: -300, opacity: 0 },
                    animate: { x: 0, opacity: 1 },
                    exit: { x: -300, opacity: 0 }
                },
                React.createElement(
                    'div',
                    { className: 'filter-header' },
                    React.createElement('h3', null, 'Discovery Settings'),
                    React.createElement('button', { className: 'close-btn', onClick: onClose },
                        React.createElement('i', { className: 'ph-fill ph-x' })
                    )
                ),

                // Gender Section
                React.createElement('div', { className: 'filter-section' },
                    React.createElement('h4', null, 'Show Me'),
                    React.createElement('div', { className: 'toggle-group' },
                        ['women', 'men', 'all'].map(opt =>
                            React.createElement('button', {
                                key: opt,
                                className: `toggle-btn ${gender === opt ? 'active' : ''}`,
                                onClick: () => setGender(opt)
                            }, opt.charAt(0).toUpperCase() + opt.slice(1))
                        )
                    )
                ),

                // Age Section (Simple Implementation with two inputs for range)
                React.createElement('div', { className: 'filter-section' },
                    React.createElement('div', { className: 'section-header' },
                        React.createElement('h4', null, 'Age Range'),
                        React.createElement('span', null, `${ageRange.min} - ${ageRange.max}`)
                    ),
                    React.createElement('div', { className: 'slider-container' },
                        React.createElement('input', {
                            type: 'range', min: 18, max: 100, value: ageRange.min,
                            onChange: (e) => setAgeRange({ ...ageRange, min: Math.min(e.target.value, ageRange.max - 1) })
                        }),
                        React.createElement('input', {
                            type: 'range', min: 18, max: 100, value: ageRange.max,
                            onChange: (e) => setAgeRange({ ...ageRange, max: Math.max(e.target.value, ageRange.min + 1) })
                        })
                    )
                ),

                // Distance Section
                React.createElement('div', { className: 'filter-section' },
                    React.createElement('div', { className: 'section-header' },
                        React.createElement('h4', null, 'Maximum Distance'),
                        React.createElement('span', null, `${distance}km`)
                    ),
                    React.createElement('input', {
                        type: 'range', min: 1, max: 100, value: distance,
                        onChange: (e) => setDistance(e.target.value),
                        className: 'single-slider'
                    })
                ),

                // Intentions Section
                React.createElement('div', { className: 'filter-section' },
                    React.createElement('h4', null, 'Looking For'),
                    React.createElement('div', { className: 'intentions-grid' },
                        [
                            { id: 'serious', label: 'Serious', icon: 'heart' },
                            { id: 'fun', label: 'New Friends', icon: 'confetti' },
                            { id: 'open', label: 'Open', icon: 'infinity' }
                        ].map(item =>
                            React.createElement('button', {
                                key: item.id,
                                className: `intention-card ${intention === item.id ? 'active' : ''}`,
                                onClick: () => setIntention(item.id)
                            },
                                React.createElement('i', { className: `ph-fill ph-${item.icon}` }),
                                React.createElement('span', null, item.label)
                            )
                        )
                    )
                ),

                React.createElement('button', { className: 'btn-primary apply-btn', onClick: handleApply }, 'Apply Filters')
            )
        )
    );
};

const styles = document.createElement('style');
styles.innerHTML = `
    .filter-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 500;
        display: flex;
        justify-content: flex-start; /* Slide from left */
    }
    .filter-content {
        width: 100%;
        max-width: 320px;
        height: 100%;
        background: #1a1a1f;
        border-right: 1px solid var(--glass-border);
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        box-shadow: 10px 0 30px rgba(0,0,0,0.5);
    }
    .filter-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }
    .filter-header h3 { color: white; margin: 0; }
    .close-btn { background: transparent; border: none; color: white; font-size: 24px; cursor: pointer; }

    .filter-section h4 { color: white; font-size: 14px; margin-bottom: 12px; font-weight: 500; }
    .section-header { display: flex; justify-content: space-between; color: var(--text-muted); font-size: 13px; margin-bottom: 8px; }

    .toggle-group {
        display: flex;
        background: rgba(255,255,255,0.05);
        border-radius: var(--radius-full);
        padding: 4px;
    }
    .toggle-btn {
        flex: 1;
        background: transparent;
        border: none;
        color: var(--text-muted);
        padding: 8px;
        border-radius: var(--radius-full);
        cursor: pointer;
        transition: all 0.2s;
        font-size: 13px;
    }
    .toggle-btn.active {
        background: var(--primary);
        color: white;
        font-weight: 600;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }

    .slider-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    input[type=range] { width: 100%; accent-color: var(--primary); }

    .intentions-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 8px;
    }
    .intention-card {
        background: rgba(255,255,255,0.05);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-sm);
        padding: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        color: var(--text-muted);
        cursor: pointer;
        transition: all 0.2s;
    }
    .intention-card:hover { background: rgba(255,255,255,0.1); }
    .intention-card.active {
        border-color: var(--primary);
        background: rgba(255, 107, 129, 0.1);
        color: var(--primary);
    }
    .intention-card i { font-size: 20px; }
    .intention-card span { font-size: 11px; text-align: center; }

    .apply-btn { margin-top: auto; justify-content: center; }
`;
document.head.appendChild(styles);

export default FilterModal;
