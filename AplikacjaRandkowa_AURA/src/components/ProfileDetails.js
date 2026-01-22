import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileDetails = ({ user, onClose }) => {
    return React.createElement(
        AnimatePresence,
        null,
        React.createElement(
            motion.div,
            {
                className: 'details-overlay',
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                onClick: onClose
            },
            React.createElement(
                motion.div,
                {
                    className: 'details-content',
                    initial: { y: '100%' },
                    animate: { y: 0 },
                    exit: { y: '100%' },
                    transition: { type: 'spring', damping: 25, stiffness: 200 },
                    onClick: (e) => e.stopPropagation()
                },

                // Close Button
                React.createElement('button', { className: 'close-btn-float', onClick: onClose },
                    React.createElement('i', { className: 'ph-bold ph-x' })
                ),

                // Cover Photo Area
                React.createElement('div', {
                    className: 'details-cover',
                    style: { backgroundImage: `url(${user.photos[0]})` }
                },
                    React.createElement('div', { className: 'cover-gradient' },
                        React.createElement('div', { className: 'cover-info' },
                            React.createElement('h2', null, `${user.name}, ${user.age}`),
                            user.safetyRating && React.createElement('div', { className: 'verified-badge' },
                                React.createElement('i', { className: 'ph-fill ph-seal-check' })
                            )
                        )
                    )
                ),

                // Scrollable Body
                React.createElement('div', { className: 'details-body' },

                    // Bio Section
                    React.createElement('div', { className: 'section' },
                        React.createElement('h3', null, 'About me'),
                        React.createElement('p', null, user.bio)
                    ),

                    // Info Grid
                    React.createElement('div', { className: 'info-grid' },
                        React.createElement(InfoItem, { icon: 'briefcase', label: 'Job', value: user.job || 'Not specified' }),
                        React.createElement(InfoItem, { icon: 'student', label: 'Education', value: user.education || 'Not specified' }),
                        React.createElement(InfoItem, { icon: 'ruler', label: 'Height', value: user.height || 'Not specified' }),
                        React.createElement(InfoItem, { icon: 'map-pin', label: 'Location', value: user.location || 'Warsaw' }),
                        React.createElement(InfoItem, { icon: 'heart', label: 'Looking for', value: user.lookingFor || 'Relationship' })
                    ),

                    // Connected Accounts
                    (user.instagram || user.spotify) && React.createElement('div', { className: 'section' },
                        React.createElement('h3', null, 'Connected Accounts'),
                        React.createElement('div', { className: 'connected-row' },
                            user.instagram && React.createElement('div', { className: 'social-pill insta' },
                                React.createElement('i', { className: 'ph-fill ph-instagram-logo' }),
                                React.createElement('span', null, user.instagram)
                            ),
                            // Spotify placeholder as we don't have mock data field everywhere yet but it's requested
                            React.createElement('div', { className: 'social-pill spotify' },
                                React.createElement('i', { className: 'ph-fill ph-spotify-logo' }),
                                React.createElement('span', null, 'My Anthem')
                            )
                        )
                    ),

                    // Interests
                    user.interests && React.createElement('div', { className: 'section' },
                        React.createElement('h3', null, 'Interests'),
                        React.createElement('div', { className: 'interests-wrap' },
                            user.interests.map((tag, i) =>
                                React.createElement('span', { key: i, className: 'detail-tag' }, tag)
                            )
                        )
                    ),

                    // Bottom Spacer
                    React.createElement('div', { style: { height: '80px' } })
                )
            )
        )
    );
};

const InfoItem = ({ icon, label, value }) => (
    React.createElement('div', { className: 'info-item' },
        React.createElement('div', { className: 'info-icon' },
            React.createElement('i', { className: `ph ph-${icon}` })
        ),
        React.createElement('div', { className: 'info-text' },
            React.createElement('span', { className: 'label' }, label),
            React.createElement('span', { className: 'value' }, value)
        )
    )
);

const styles = document.createElement('style');
styles.innerHTML = `
    .details-overlay {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.6); z-index: 1300;
        display: flex; justify-content: center; align-items: flex-end;
    }
    .details-content {
        width: 100%; max-width: 500px; height: 90vh;
        background: var(--bg-dark); /* Using theme variable directly */
        border-radius: 24px 24px 0 0;
        display: flex; flex-direction: column; overflow: hidden;
        position: relative;
    }
    .close-btn-float {
        position: absolute; top: 20px; right: 20px;
        width: 40px; height: 40px; border-radius: 50%;
        background: white; border: none; color: black;
        z-index: 10; cursor: pointer; display: flex; justify-content: center; align-items: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    
    .details-cover {
        height: 350px; flex-shrink: 0;
        background-size: cover; background-position: center;
        position: relative;
    }
    .cover-gradient {
        position: absolute; bottom: 0; left: 0; width: 100%; height: 50%;
        background: linear-gradient(to top, var(--bg-dark), transparent);
        display: flex; align-items: flex-end; padding: 24px;
    }
    .cover-info { display: flex; align-items: center; gap: 8px; }
    .cover-info h2 { font-size: 32px; font-weight: 800; color: white; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
    .verified-badge { color: #2ed573; font-size: 24px; }

    .details-body {
        padding: 24px; overflow-y: auto; background: var(--bg-dark);
        display: flex; flex-direction: column; gap: 24px;
    }

    .section h3 { font-size: 18px; font-weight: 700; color: var(--text-main); margin-bottom: 12px; }
    .section p { font-size: 15px; color: var(--text-muted); line-height: 1.6; }

    .info-grid { display: grid; gap: 16px; }
    .info-item { display: flex; align-items: center; gap: 16px; }
    .info-icon { font-size: 24px; color: var(--text-muted); width: 24px; text-align: center; }
    .info-text { display: flex; flex-direction: column; }
    .info-text .label { font-size: 12px; color: var(--text-muted); }
    .info-text .value { font-size: 16px; color: var(--text-main); font-weight: 500; }

    .connected-row { display: flex; gap: 12px; flex-wrap: wrap; }
    .social-pill {
        display: flex; align-items: center; gap: 8px;
        padding: 8px 16px; border-radius: var(--radius-full);
        font-size: 14px; font-weight: 600; color: white;
    }
    .social-pill.insta { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
    .social-pill.spotify { background: #1DB954; }

    .interests-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
    .detail-tag {
        padding: 6px 14px; border: 1px solid var(--glass-border); border-radius: var(--radius-full);
        font-size: 13px; color: var(--text-muted);
    }
`;
document.head.appendChild(styles);

export default ProfileDetails;
