import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SafetyReviews = ({ user, onClose }) => {
    return React.createElement(
        AnimatePresence,
        null,
        React.createElement(
            motion.div,
            {
                className: 'reviews-overlay',
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                onClick: onClose
            },
            React.createElement(
                motion.div,
                {
                    className: 'reviews-content glass-panel',
                    initial: { y: 100, opacity: 0 },
                    animate: { y: 0, opacity: 1 },
                    exit: { y: 100, opacity: 0 },
                    onClick: (e) => e.stopPropagation()
                },
                React.createElement(
                    'div',
                    { className: 'reviews-header' },
                    React.createElement('h3', null, `Safety Reviews for ${user.name}`),
                    React.createElement('button', { className: 'close-btn', onClick: onClose },
                        React.createElement('i', { className: 'ph-fill ph-x' })
                    )
                ),

                // Score Summary
                React.createElement('div', { className: 'score-summary' },
                    React.createElement('i', { className: 'ph-fill ph-shield-check', style: { fontSize: 32, color: '#2ed573' } }),
                    React.createElement('div', { className: 'big-score' }, user.safetyRating),
                    React.createElement('span', null, 'Average Safety Score')
                ),

                // Reviews List
                React.createElement('div', { className: 'comments-list' },
                    (user.reviews && user.reviews.length > 0)
                        ? user.reviews.map(review =>
                            React.createElement('div', { key: review.id, className: 'review-item' },
                                React.createElement('div', { className: 'review-top' },
                                    React.createElement('span', { className: 'author' }, review.author),
                                    React.createElement('span', { className: 'rating-badge' },
                                        React.createElement('i', { className: 'ph-fill ph-star' }),
                                        review.rating
                                    )
                                ),
                                React.createElement('p', { className: 'comment-text' }, review.comment),
                                React.createElement('span', { className: 'review-date' }, review.date)
                            )
                        )
                        : React.createElement('p', { className: 'no-reviews' }, 'No written reviews yet.')
                )
            )
        )
    );
};

const styles = document.createElement('style');
styles.innerHTML = `
    .reviews-overlay {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.7);
        z-index: 1200;
        display: flex; justify-content: center; align-items: flex-end;
    }
    .reviews-content {
        width: 100%;
        max-width: 500px;
        height: 70vh;
        background: #1a1a1f;
        border-radius: 24px 24px 0 0;
        padding: 24px;
        display: flex; flex-direction: column;
    }
    .reviews-header {
        display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;
    }
    .reviews-header h3 { color: white; margin: 0; font-size: 18px; }

    .score-summary {
        display: flex; flex-direction: column; align-items: center; gap: 8px;
        padding: 24px; background: rgba(255,255,255,0.05); border-radius: 16px; margin-bottom: 24px;
    }
    .big-score { font-size: 48px; font-weight: 800; color: white; line-height: 1; }
    .score-summary span { color: var(--text-muted); font-size: 14px; }

    .comments-list { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }
    
    .review-item {
        padding: 16px; background: rgba(255,255,255,0.03); border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.05);
    }
    .review-top { display: flex; justify-content: space-between; margin-bottom: 8px; }
    .author { color: white; font-weight: 600; font-size: 15px; }
    .rating-badge { 
        display: flex; align-items: center; gap: 4px; 
        background: rgba(255, 215, 0, 0.15); color: #ffd700; 
        padding: 2px 8px; border-radius: 12px; font-size: 13px; font-weight: 700;
    }
    .comment-text { color: rgba(255,255,255,0.9); font-size: 14px; line-height: 1.5; margin-bottom: 8px; }
    .review-date { color: var(--text-muted); font-size: 12px; }
    
    .no-reviews { text-align: center; color: var(--text-muted); margin-top: 40px; }
`;
document.head.appendChild(styles);

export default SafetyReviews;
