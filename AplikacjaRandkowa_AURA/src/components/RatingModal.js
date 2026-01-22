import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RatingModal = ({ user, onClose, onSubmit }) => {
    const [rating, setRating] = useState(5.0);
    const [category, setCategory] = useState('');
    const [comment, setComment] = useState('');

    const categories = [
        { id: 'ghosting', label: 'Ghosting', icon: 'ghost' },
        { id: 'catfish', label: 'Catfish', icon: 'cat' },
        { id: 'noshow', label: 'No Show', icon: 'calendar-x' },
        { id: 'safe', label: 'Verified/Safe', icon: 'shield-check' }
    ];

    const handleSubmit = () => {
        onSubmit({ userId: user.id, rating, category, comment });
        onClose();
    };

    return React.createElement(
        AnimatePresence,
        null,
        React.createElement(
            motion.div,
            {
                className: 'modal-overlay',
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 }
            },
            React.createElement(
                motion.div,
                {
                    className: 'modal-content glass-panel',
                    initial: { y: 100, opacity: 0 },
                    animate: { y: 0, opacity: 1 },
                    exit: { y: 100, opacity: 0 }
                },
                React.createElement(
                    'div',
                    { className: 'modal-header' },
                    React.createElement('h3', null, `Rate ${user.name}`),
                    React.createElement('button', { className: 'close-btn', onClick: onClose },
                        React.createElement('i', { className: 'ph-fill ph-x' })
                    )
                ),

                // Rating Slider
                React.createElement(
                    'div',
                    { className: 'rating-section' },
                    React.createElement('div', { className: 'rating-display' }, rating.toFixed(1)),
                    React.createElement('input', {
                        type: 'range',
                        min: '0',
                        max: '5',
                        step: '0.1',
                        value: rating,
                        onChange: (e) => setRating(parseFloat(e.target.value)),
                        className: 'rating-slider'
                    }),
                    React.createElement('p', { className: 'helper-text' }, '0.0 (Risk) - 5.0 (Safe)')
                ),

                // Categories
                React.createElement(
                    'div',
                    { className: 'categories-grid' },
                    categories.map(cat =>
                        React.createElement(
                            'button',
                            {
                                key: cat.id,
                                className: `category-btn ${category === cat.id ? 'active' : ''}`,
                                onClick: () => setCategory(cat.id)
                            },
                            React.createElement('i', { className: `ph ph-${cat.icon}` }),
                            React.createElement('span', null, cat.label)
                        )
                    )
                ),

                // Comment Section
                React.createElement('div', { className: 'comment-section', style: { marginBottom: '24px' } },
                    React.createElement('label', { style: { display: 'block', color: 'var(--text-muted)', marginBottom: '8px', fontSize: '14px' } }, 'Tell us what happened (Optional)'),
                    React.createElement('textarea', {
                        value: comment,
                        onChange: (e) => setComment(e.target.value),
                        placeholder: 'Describe the situation...',
                        style: {
                            width: '100%',
                            minHeight: '80px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '12px',
                            color: 'white',
                            fontFamily: 'inherit',
                            resize: 'vertical'
                        }
                    })
                ),

                React.createElement(
                    'button',
                    { className: 'btn-primary submit-btn', onClick: handleSubmit },
                    'Submit Rating'
                )
            )
        )
    );
};

const styles = document.createElement('style');
styles.innerHTML = `
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }
    .modal-content {
        width: 100%;
        max-width: 400px;
        padding: 24px;
        border-radius: var(--radius-lg);
        background: #1a1a1f; 
        border: 1px solid var(--glass-border);
    }
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }
    .modal-header h3 {
        color: white;
        font-size: 20px;
    }
    .close-btn {
        background: transparent;
        border: none;
        color: var(--text-muted);
        font-size: 24px;
        cursor: pointer;
    }
    .rating-display {
        font-size: 48px;
        font-weight: 700;
        color: var(--primary);
        text-align: center;
        margin-bottom: 16px;
    }
    .rating-slider {
        width: 100%;
        margin-bottom: 8px;
        accent-color: var(--primary);
    }
    .helper-text {
        text-align: center;
        color: var(--text-muted);
        font-size: 14px;
        margin-bottom: 24px;
    }
    .categories-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-bottom: 24px;
    }
    .category-btn {
        background: rgba(255,255,255,0.05);
        border: 1px solid transparent;
        padding: 12px;
        border-radius: var(--radius-sm);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        color: var(--text-muted);
        cursor: pointer;
        transition: all 0.2s;
    }
    .category-btn:hover {
        background: rgba(255,255,255,0.1);
    }
    .category-btn.active {
        background: rgba(255, 107, 129, 0.1); /* Primary color low opacity */
        border-color: var(--primary);
        color: var(--primary);
    }
    .category-btn i {
        font-size: 24px;
    }
    .submit-btn {
        width: 100%;
        justify-content: center;
    }
`;
document.head.appendChild(styles);

export default RatingModal;
