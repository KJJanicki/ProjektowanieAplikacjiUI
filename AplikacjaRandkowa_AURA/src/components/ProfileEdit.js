import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { currentUser } from '../data/mockUsers.js';

const ProfileEdit = ({ onBack }) => {
    const [user, setUser] = useState(currentUser);

    // Mock Interests
    const allInterests = ['Travel', 'Coffee', 'Gaming', 'Art', 'Music', 'Cooking', 'Gym', 'Hiking', 'Photography', 'Reading'];

    const handleAddPhoto = (index) => {
        const url = window.prompt("Enter image URL (e.g. from Unsplash):");
        if (url) {
            const newPhotos = [...user.photos];
            newPhotos[index] = url;
            // If pushing new beyond current length, it fills the slot. 
            // Logic handled by rendering loop usually.

            // NOTE: For this demo to persist nicely we'd update global state, but local state works for the view.
            setUser({ ...user, photos: newPhotos });
        }
    };

    const handleRemovePhoto = (index) => {
        const newPhotos = [...user.photos];
        newPhotos[index] = null; // Clear slot rather than splice to keep grid layout? Or filter?
        // Let's filter for simplicity of the list, or set to null
        // If we set to null, we need to handle nulls in render. 
        // Let's just splice for now as standard behavior
        setUser({ ...user, photos: user.photos.filter((_, i) => i !== index) });
    };

    const toggleInterest = (interest) => {
        const currentInterests = user.interests || [];
        if (currentInterests.includes(interest)) {
            setUser({ ...user, interests: currentInterests.filter(i => i !== interest) });
        } else {
            setUser({ ...user, interests: [...currentInterests, interest] });
        }
    };

    const editDetail = (field, currentVal) => {
        const newVal = window.prompt(`Edit ${field}:`, currentVal === 'Add' ? '' : currentVal);
        if (newVal !== null) {
            alert(`Updated ${field} to ${newVal}`);
            // In a real app we'd update the user object field here if it matched a key.
        }
    };

    return React.createElement(
        'div',
        { className: 'edit-container' },

        // Header
        React.createElement('div', { className: 'edit-header glass-panel' },
            React.createElement('div', { className: 'header-row' },
                React.createElement('h2', null, 'Edit Profile'),
                React.createElement('button', { className: 'done-btn', onClick: onBack }, 'Done')
            ),
            // Progress Bar
            React.createElement('div', { className: 'progress-section' },
                React.createElement('div', { className: 'progress-label' },
                    React.createElement('span', null, 'Profile Strength'),
                    React.createElement('span', { className: 'percent' }, '85%')
                ),
                React.createElement('div', { className: 'progress-track' },
                    React.createElement('div', { className: 'progress-fill', style: { width: '85%' } })
                ),
                React.createElement('p', { className: 'progress-hint' }, 'Add 2 more photos to get 3x more matches!')
            )
        ),

        // Scrollable Content
        React.createElement('div', { className: 'edit-scroll-area' },

            // Photos Grid
            React.createElement('h3', { className: 'section-title' }, 'Photos'),
            React.createElement('div', { className: 'photo-grid' },
                [0, 1, 2, 3, 4, 5].map(idx =>
                    user.photos[idx]
                        ? React.createElement('div', { key: idx, className: 'photo-slot filled', style: { backgroundImage: `url(${user.photos[idx]})` } },
                            React.createElement('button', { className: 'remove-photo', onClick: () => handleRemovePhoto(idx) }, React.createElement('i', { className: 'ph-bold ph-x' }))
                        )
                        : React.createElement('div', { key: idx, className: 'photo-slot empty', onClick: () => handleAddPhoto(idx) },
                            React.createElement('i', { className: 'ph-bold ph-plus' })
                        )
                )
            ),

            // Basic Info
            React.createElement('h3', { className: 'section-title' }, 'Basic Info'),
            React.createElement('div', { className: 'form-group glass-panel' },
                React.createElement('label', null, 'Name'),
                React.createElement('input', { value: user.name, onChange: (e) => setUser({ ...user, name: e.target.value }) }),
                React.createElement('div', { className: 'divider' }),
                React.createElement('label', null, 'Bio'),
                React.createElement('textarea', { value: user.bio, onChange: (e) => setUser({ ...user, bio: e.target.value }) })
            ),

            // Interests
            React.createElement('h3', { className: 'section-title' }, 'Interests'),
            React.createElement('div', { className: 'interests-grid' },
                allInterests.map(interest =>
                    React.createElement('button', {
                        key: interest,
                        className: `interest-tag ${(user.interests || []).includes(interest) ? 'active' : ''}`,
                        onClick: () => toggleInterest(interest)
                    }, interest)
                )
            ),

            // Details
            React.createElement('h3', { className: 'section-title' }, 'Details'),
            React.createElement('div', { className: 'form-group glass-panel' },
                React.createElement(DetailRow, { icon: 'map-pin', label: 'Location', value: 'Warsaw', onClick: () => editDetail('Location', 'Warsaw') }),
                React.createElement(DetailRow, { icon: 'briefcase', label: 'Job', value: 'Chef', onClick: () => editDetail('Job', 'Chef') }),
                React.createElement(DetailRow, { icon: 'student', label: 'Education', value: 'Add', onClick: () => editDetail('Education', 'Add') })
            ),

            // Connected Accounts
            React.createElement('h3', { className: 'section-title' }, 'Connected Accounts'),
            React.createElement('div', { className: 'accounts-list' },
                React.createElement('div', { className: 'account-item insta', onClick: () => editDetail('Instagram Link', '') },
                    React.createElement('i', { className: 'ph-fill ph-instagram-logo' }),
                    React.createElement('span', null, 'Connect Instagram')
                ),
                React.createElement('div', { className: 'account-item spotify', onClick: () => editDetail('Spotify Link', '') },
                    React.createElement('i', { className: 'ph-fill ph-spotify-logo' }),
                    React.createElement('span', null, 'Connect Spotify')
                )
            )
        )
    );
};

const DetailRow = ({ icon, label, value, onClick }) => (
    React.createElement('div', { className: 'detail-row', onClick: onClick, style: { cursor: 'pointer' } },
        React.createElement('div', { className: 'detail-left' },
            React.createElement('i', { className: `ph ph-${icon}` }),
            React.createElement('span', null, label)
        ),
        React.createElement('div', { className: 'detail-right' },
            React.createElement('span', { className: value === 'Add' ? 'placeholder' : '' }, value),
            React.createElement('i', { className: 'ph-bold ph-caret-right' })
        )
    )
);

const styles = document.createElement('style');
styles.innerHTML = `
    .edit-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        background: var(--bg-dark);
    }
    .edit-header {
        padding: 24px 24px 16px;
        z-index: 10;
        border-bottom: 1px solid var(--glass-border);
    }
    .header-row {
        display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;
    }
    .header-row h2 { font-size: 20px; font-weight: 700; color: white; margin: 0; }
    .done-btn { background: transparent; border: none; color: var(--primary); font-weight: 600; cursor: pointer; }

    .progress-label { display: flex; justify-content: space-between; font-size: 13px; color: var(--text-muted); margin-bottom: 8px; }
    .percent { color: var(--primary); font-weight: 700; }
    .progress-track { height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; margin-bottom: 8px; }
    .progress-fill { height: 100%; background: linear-gradient(90deg, var(--secondary), var(--primary)); }
    .progress-hint { font-size: 12px; color: var(--text-muted); }

    .edit-scroll-area {
        flex: 1; overflow-y: auto; padding: 24px; padding-bottom: 100px;
    }

    .section-title { font-size: 16px; color: white; margin: 24px 0 12px; font-weight: 600; }
    .section-title:first-child { margin-top: 0; }

    .photo-grid {
        display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;
    }
    .photo-slot {
        aspect-ratio: 2/3; background: rgba(255,255,255,0.05); border-radius: var(--radius-md);
        display: flex; justify-content: center; align-items: center; border: 2px dashed rgba(255,255,255,0.1);
        position: relative; background-size: cover; background-position: center;
        cursor: pointer;
    }
    .photo-slot.filled { border: none; }
    .photo-slot i { font-size: 24px; color: var(--text-muted); }
    .remove-photo {
        position: absolute; bottom: -8px; right: -8px; width: 24px; height: 24px;
        background: #ff4757; color: white; border-radius: 50%; border: 2px solid #1a1a1f;
        display: flex; justify-content: center; align-items: center; cursor: pointer;
    }

    .form-group {
        padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--glass-border);
    }
    .form-group label { display: block; font-size: 12px; color: var(--primary); margin-bottom: 4px; }
    .form-group input, .form-group textarea {
        width: 100%; background: transparent; border: none; color: white; font-family: inherit; font-size: 15px; outline: none;
    }
    .form-group textarea { resize: none; min-height: 60px; }
    .divider { height: 1px; background: rgba(255,255,255,0.05); margin: 12px 0; }

    .detail-row {
        display: flex; justify-content: space-between; align-items: center; padding: 12px 0;
        border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .detail-row:last-child { border-bottom: none; }
    .detail-left { display: flex; gap: 12px; color: var(--text-muted); font-size: 14px; }
    .detail-right { display: flex; gap: 8px; align-items: center; color: white; font-size: 14px; }
    .detail-right .placeholder { color: var(--text-muted); }

    .accounts-list { display: flex; flex-direction: column; gap: 12px; }
    .account-item {
        padding: 16px; border-radius: var(--radius-md); display: flex; align-items: center; gap: 16px;
        color: white; font-weight: 500; cursor: pointer;
    }
    .account-item.insta { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
    .account-item.spotify { background: #1DB954; }
    .account-item i { font-size: 24px; }

    .interests-grid {
        display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;
    }
    .interest-tag {
        background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border);
        padding: 6px 16px; border-radius: var(--radius-full);
        color: var(--text-muted); font-size: 13px; cursor: pointer;
        transition: all 0.2s;
    }
    .interest-tag:hover { background: rgba(255,255,255,0.1); }
    .interest-tag.active {
        background: var(--primary); color: white; border-color: var(--primary);
    }
`;
document.head.appendChild(styles);

export default ProfileEdit;
