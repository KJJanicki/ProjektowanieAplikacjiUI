import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import Card from './Card.js';
import RatingModal from './RatingModal.js';
import FilterModal from './FilterModal.js';
import SafetyReviews from './SafetyReviews.js';
import ProfileDetails from './ProfileDetails.js'; // New import
import { mockUsers } from '../data/mockUsers.js';

const SwipeDeck = () => {
    const [cards, setCards] = useState(mockUsers);
    const [ratingUser, setRatingUser] = useState(null);
    const [reviewUser, setReviewUser] = useState(null);
    const [detailsUser, setDetailsUser] = useState(null); // New state for details
    const [showFilters, setShowFilters] = useState(false);

    const removeCard = (id, direction) => {
        console.log(`Swiped ${direction} on user ${id}`);
        setCards(prev => prev.filter(card => card.id !== id));
    };

    const handleRateSubmit = ({ userId, rating, category }) => {
        alert(`Rating Submitted: ${rating}/5.0 (Category: ${category})`);
        setRatingUser(null);
    };

    const handleFilterApply = (filters) => {
        console.log('Filters Applied:', filters);

        // Filter logic
        const filtered = mockUsers.filter(user => {
            // Gender Filter
            if (filters.gender !== 'all') {
                if (user.gender && user.gender !== filters.gender) return false;
            }
            // Age Filter (Basic range check)
            if (user.age < filters.ageRange.min || user.age > filters.ageRange.max) return false;

            return true;
        });

        setCards(filtered);
    };

    return React.createElement(
        'div',
        { className: 'deck-container' },

        // Filter Button
        React.createElement(
            'button',
            {
                className: 'filter-trigger glass-panel',
                onClick: () => setShowFilters(true)
            },
            React.createElement('i', { className: 'ph-fill ph-sliders-horizontal' })
        ),

        cards.length > 0
            ? React.createElement(
                'div',
                { className: 'card-stack' },
                cards.map((user, index) => {
                    const isTop = index === cards.length - 1;
                    return React.createElement(DraggableCard, {
                        key: user.id,
                        user: user,
                        isTop: isTop,
                        onSwipe: (dir) => removeCard(user.id, dir),
                        onShowReviews: () => setReviewUser(user),
                        onShowDetails: () => setDetailsUser(user) // Pass details handler
                    });
                })
            )
            : React.createElement(
                'div',
                { className: 'empty-state' },
                React.createElement('h2', null, 'No more profiles!'),
                React.createElement('p', null, 'Check back later.'),
                React.createElement('button', {
                    className: 'btn-primary',
                    onClick: () => setCards(mockUsers)
                }, 'Reset Demo')
            ),

        // Action Buttons
        cards.length > 0 && React.createElement(ActionButtons, {
            onSwipe: (dir) => removeCard(cards[cards.length - 1].id, dir),
            onRate: () => setRatingUser(cards[cards.length - 1])
        }),

        // Modals
        ratingUser && React.createElement(RatingModal, {
            user: ratingUser,
            onClose: () => setRatingUser(null),
            onSubmit: handleRateSubmit
        }),

        reviewUser && React.createElement(SafetyReviews, {
            user: reviewUser,
            onClose: () => setReviewUser(null)
        }),

        detailsUser && React.createElement(ProfileDetails, {
            user: detailsUser,
            onClose: () => setDetailsUser(null)
        }),

        showFilters && React.createElement(FilterModal, {
            onClose: () => setShowFilters(false),
            onApply: handleFilterApply
        })
    );
};

const DraggableCard = ({ user, isTop, onSwipe, onShowReviews, onShowDetails }) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-15, 15]);
    // Opacity fades out as you drag far away
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

    const handleDragEnd = (_, info) => {
        if (info.offset.x > 100) {
            onSwipe('right');
        } else if (info.offset.x < -100) {
            onSwipe('left');
        }
    };

    return React.createElement(
        motion.div,
        {
            style: {
                x: isTop ? x : 0,
                rotate: isTop ? rotate : 0,
                scale: isTop ? 1 : 0.95,
                zIndex: isTop ? 100 : 10,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: isTop ? 1 : 0.5
            },
            drag: isTop ? 'x' : false,
            dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
            onDragEnd: handleDragEnd,
            exit: { opacity: 0 },
            transition: { type: 'spring', stiffness: 300, damping: 20 },
            className: 'swipe-card-wrapper'
        },
        React.createElement(Card, { user: user, onShowReviews: onShowReviews, onShowDetails: onShowDetails })
    );
};

const ActionButtons = ({ onSwipe, onRate }) => {
    return React.createElement(
        'div',
        { className: 'action-bar glass-panel' },
        React.createElement('button', { className: 'action-btn nope', onClick: () => onSwipe('left') },
            React.createElement('i', { className: 'ph-fill ph-x' })
        ),
        React.createElement('button', { className: 'action-btn super' },
            React.createElement('i', { className: 'ph-fill ph-star' })
        ),
        React.createElement('button', { className: 'action-btn like', onClick: () => onSwipe('right') },
            React.createElement('i', { className: 'ph-fill ph-heart' })
        ),
        React.createElement('button', {
            className: 'action-btn rate',
            onClick: onRate,
            style: { marginLeft: '12px', background: 'rgba(255,165,2,0.15)', border: '1px solid var(--primary)' }
        },
            React.createElement('i', { className: 'ph-fill ph-shield-warning', style: { color: 'var(--primary)' } })
        )
    );
};

// Styles
const styles = document.createElement('style');
styles.innerHTML = `
    .deck-container {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        overflow: hidden;
    }
    .card-stack {
        width: 100%;
        height: 100%;
        position: relative;
        padding: 16px;
        padding-bottom: 100px;
    }
    .filter-trigger {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        z-index: 200;
        background: rgba(255,255,255,0.1);
    }
    .swipe-card-wrapper {
        border-radius: var(--radius-lg);
        transform-origin: 50% 100%;
    }
    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: var(--text-muted);
        gap: 16px;
    }
    .action-bar {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 20px;
        padding: 12px 24px;
        border-radius: var(--radius-full);
        z-index: 200;
    }
    .action-btn {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        cursor: pointer;
        transition: transform 0.2s;
        background: rgba(255,255,255,0.1);
        color: white;
    }
    .action-btn:hover {
        transform: scale(1.1);
    }
    .action-btn.nope { color: #ff4757; border: 1px solid rgba(255, 71, 87, 0.3); }
    .action-btn.like { color: #2ed573; border: 1px solid rgba(46, 213, 115, 0.3); }
    .action-btn.super { color: #3742fa; border: 1px solid rgba(55, 66, 250, 0.3); }
`;
document.head.appendChild(styles);

export default SwipeDeck;
