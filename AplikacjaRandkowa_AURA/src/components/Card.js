import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const Card = ({ user, style, onSwipe, drag, onShowReviews, onShowDetails }) => {
    // If we wanted local drag logic we'd use useMotionValue here, 
    // but the deck handles the top card's drag state often. 
    // For simplicity, we'll let the parent control drag capability via props or 
    // make this component simply render the visual card.

    // We will use framer-motion's motion.div directly in the Deck for the active card,
    // but we can wrap the content here.

    return React.createElement(
        'div',
        { className: 'card-container', style: style },
        React.createElement('div', {
            className: 'card-image',
            style: { backgroundImage: `url(${user.photos[0]})` }
        }),
        React.createElement(
            'div',
            { className: 'card-overlay' },
            React.createElement(
                'div',
                { className: 'card-info' },
                React.createElement(
                    'div',
                    { className: 'card-header' },
                    // Make name clickable for details
                    React.createElement('div', {
                        onClick: (e) => { e.stopPropagation(); if (onShowDetails) onShowDetails(); },
                        style: { cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }
                    },
                        React.createElement('h2', null, `${user.name}, ${user.age}`),
                        React.createElement('i', { className: 'ph-fill ph-info', style: { fontSize: '20px', color: 'rgba(255,255,255,0.7)' } })
                    ),

                    React.createElement(
                        'div',
                        {
                            className: 'safety-badge',
                            onClick: (e) => {
                                e.stopPropagation(); // Prevent drag/swipe
                                if (onShowReviews) onShowReviews();
                            },
                            style: { cursor: 'pointer', pointerEvents: 'auto' }, // Ensure clickable
                            title: 'View Reviews'
                        },
                        React.createElement('i', { className: 'ph-fill ph-shield-check' }),
                        React.createElement('span', null, user.safetyRating)
                    )
                ),
                React.createElement('p', { className: 'card-bio' }, user.bio),
                React.createElement(
                    'div',
                    { className: 'card-tags' },
                    // Just mock tags for now
                    React.createElement('span', { className: 'tag' }, 'Coffee'),
                    React.createElement('span', { className: 'tag' }, 'Travel')
                )
            )
        )
    );
};

const styles = document.createElement('style');
styles.innerHTML = `
    .card-container {
        width: 100%;
        height: 100%;
        border-radius: var(--radius-lg);
        overflow: hidden;
        position: relative;
        background: var(--bg-dark);
        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    }
    .card-image {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
    }
    .card-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 80px 20px 120px;
        background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
    }
    .card-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 8px;
    }
    .card-header h2 {
        font-size: 24px;
        font-weight: 700;
        color: white;
    }
    .safety-badge {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        background: rgba(46, 213, 115, 0.2);
        border: 1px solid rgba(46, 213, 115, 0.5);
        border-radius: var(--radius-full);
        color: #2ed573;
        font-weight: 600;
        font-size: 14px;
    }
    .card-bio {
        color: rgba(255,255,255,0.8);
        font-size: 15px;
        line-height: 1.4;
        margin-bottom: 12px;
    }
    .card-tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }
    .tag {
        padding: 6px 12px;
        background: rgba(255,255,255,0.15);
        border-radius: var(--radius-full);
        font-size: 13px;
        color: white;
    }
`;
document.head.appendChild(styles);

export default Card;
