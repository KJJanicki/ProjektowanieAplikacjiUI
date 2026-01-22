export const currentUser = {
    id: 'me',
    name: 'Alex',
    age: 28,
    photos: [
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1000&auto=format&fit=crop'
    ],
    bio: 'Digital nomad, coffee enthusiast, and amateur photographer. Always looking for the next adventure.',
    safetyRating: 4.8,
    interests: ['Travel', 'Coffee', 'Photography'],
    reviews: [
        { id: 101, author: 'Sarah', rating: 5.0, comment: 'Super chill and respectful.', date: '2 days ago' },
        { id: 102, author: 'Mike', rating: 4.5, comment: 'Fun hangout.', date: '1 week ago' }
    ],
    job: 'Freelancer',
    education: 'University of Tech',
    height: '180 cm',
    location: 'Warsaw',
    lookingFor: 'Something Serious',
    instagram: '@alex_dev'
};

export const mockUsers = [
    {
        id: 1,
        name: 'Sarah',
        age: 24,
        gender: 'women',
        photos: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=1000&auto=format&fit=crop'],
        bio: 'Artist & Designer. Love museums and wine nights. 🎨🍷',
        safetyRating: 4.9,
        reviews: [
            { id: 201, author: 'Alex', rating: 5.0, comment: 'Very safety conscious and polite.', date: '3 days ago' },
            { id: 202, author: 'John', rating: 4.8, comment: 'Great listener!', date: '1 week ago' }
        ],
        job: 'Graphic Designer',
        education: 'Academy of Fine Arts',
        height: '168 cm',
        location: 'Warsaw • 3 km away',
        lookingFor: 'Relationship',
        instagram: '@sarah_art',
        interests: ['Art', 'Wine', 'Museums', 'Design']
    },
    {
        id: 2,
        name: 'Mike',
        age: 29,
        gender: 'men',
        photos: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop'],
        bio: 'Tech founder. Into hiking and cycling. Let\'s go for a ride? 🚴‍♂️',
        safetyRating: 4.5,
        reviews: [
            { id: 203, author: 'Kate', rating: 4.0, comment: 'Nice guy but talks about crypto too much.', date: '5 days ago' },
            { id: 204, author: 'Tom', rating: 5.0, comment: 'Solid gym buddy.', date: '2 weeks ago' }
        ],
        job: 'Startup Founder',
        education: 'Politechnika',
        height: '182 cm',
        location: 'Warsaw • 5 km away',
        lookingFor: 'New Friends',
        instagram: '@mike_tech',
        interests: ['Tech', 'Cycling', 'Hiking', 'Coffee']
    },
    {
        id: 3,
        name: 'Jessica',
        age: 26,
        gender: 'women',
        photos: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop'],
        bio: 'Foodie looking for a dinner date. 🍕🍣',
        safetyRating: 4.7,
        reviews: [
            { id: 205, author: 'Ben', rating: 4.5, comment: 'Knows all the best spots in town!', date: '1 day ago' },
            { id: 206, author: 'Anna', rating: 5.0, comment: 'Super sweet.', date: '3 weeks ago' }
        ],
        job: 'Marketing Manager',
        education: 'SGH',
        height: '170 cm',
        location: 'Warsaw • 2 km away',
        lookingFor: 'Fun',
        instagram: '@jess_foodie',
        interests: ['Food', 'Sushi', 'Travel', 'Movies']
    },
    {
        id: 4,
        name: 'David',
        age: 31,
        gender: 'men',
        photos: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop'],
        bio: 'Musician. I play guitar and piano. 🎸🎹',
        safetyRating: 4.2,
        reviews: [
            { id: 207, author: 'Lisa', rating: 3.5, comment: 'Arrived 15 mins late but nice music.', date: '4 days ago' },
            { id: 208, author: 'Mark', rating: 5.0, comment: 'Jam session was fire.', date: '1 month ago' },
            { id: 209, author: 'Sophie', rating: 4.0, comment: 'A bit quiet at first.', date: '2 days ago' }
        ],
        job: 'Musician',
        education: 'Music Academy',
        height: '178 cm',
        location: 'Warsaw • 8 km away',
        lookingFor: 'Open to anything',
        instagram: '@dave_music',
        interests: ['Music', 'Guitar', 'Concerts', 'Vinyl']
    },
    {
        id: 5,
        name: 'Emma',
        age: 23,
        gender: 'women',
        photos: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop'],
        bio: 'Student. Love traveling and meeting new people.',
        safetyRating: 5.0,
        reviews: [
            { id: 210, author: 'Chris', rating: 5.0, comment: 'Verified safe! Very friendly.', date: 'Yesterday' }
        ],
        job: 'Student',
        education: 'University of Warsaw',
        height: '165 cm',
        location: 'Warsaw • 1 km away',
        lookingFor: 'New Friends',
        interests: ['Travel', 'Books', 'Languages']
    },
    {
        id: 6,
        name: 'Tom',
        age: 27,
        gender: 'men',
        photos: ['https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=1000&auto=format&fit=crop'],
        bio: 'Fitness junkie. Gym partner?',
        safetyRating: 4.6,
        reviews: [
            { id: 211, author: 'Paul', rating: 4.5, comment: 'Motivating workout buddy.', date: '3 days ago' },
            { id: 212, author: 'Julia', rating: 5.0, comment: 'Respectful and fun.', date: '2 weeks ago' }
        ],
        job: 'Personal Trainer',
        education: 'AWF',
        height: '185 cm',
        location: 'Warsaw • 4 km away',
        lookingFor: 'Relationship',
        instagram: '@tom_fit',
        interests: ['Gym', 'Fitness', 'Healthy Food']
    },
    {
        id: 7,
        name: 'Olivia',
        age: 25,
        gender: 'women',
        photos: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&auto=format&fit=crop'],
        bio: 'Yoga teacher. Namaste. 🧘‍♀️',
        safetyRating: 4.8,
        reviews: [
            { id: 213, author: 'Meghan', rating: 5.0, comment: 'Calming vibes.', date: '1 week ago' }
        ],
        job: 'Yoga Instructor',
        height: '172 cm',
        location: 'Warsaw',
        lookingFor: 'Something Serious',
        interests: ['Yoga', 'Meditation', 'Nature']
    },
    {
        id: 8,
        name: 'Daniel',
        age: 30,
        gender: 'men',
        photos: ['https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop'],
        bio: 'Entrepreneur. Always working on something new.',
        safetyRating: 4.3,
        reviews: [],
        job: 'CEO',
        education: 'Stanford',
        height: '180 cm',
        location: 'Warsaw',
        lookingFor: 'Relationship',
        interests: ['Business', 'Tech', 'Startups']
    },
    {
        id: 9,
        name: 'Sophia',
        age: 22,
        gender: 'women',
        photos: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'],
        bio: 'Fashion lover. 👗👠',
        safetyRating: 4.9,
        reviews: [
            { id: 214, author: 'Lucas', rating: 5.0, comment: 'Great style and personality.', date: '2 days ago' },
            { id: 215, author: 'Maria', rating: 5.0, comment: 'Went shopping, super fun!', date: '5 days ago' }
        ],
        job: 'Stylist',
        education: 'Fashion School',
        height: '175 cm',
        location: 'Warsaw',
        lookingFor: 'Fun',
        instagram: '@sophia_style',
        interests: ['Fashion', 'Shopping', 'Design']
    },
    {
        id: 10,
        name: 'James',
        age: 28,
        gender: 'men',
        photos: ['https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?q=80&w=1000&auto=format&fit=crop'],
        bio: 'Photographer. Let me take your picture. 📸',
        safetyRating: 4.7,
        reviews: [
            { id: 216, author: 'Emily', rating: 4.5, comment: 'Professional and talented.', date: '1 month ago' }
        ],
        job: 'Photographer',
        height: '178 cm',
        location: 'Warsaw',
        lookingFor: 'Open to anything',
        instagram: '@james_photo',
        interests: ['Photography', 'Travel', 'Art']
    },
    {
        id: 11,
        name: 'Emily',
        age: 25,
        gender: 'women',
        photos: ['https://images.unsplash.com/photo-1678122675001-f2f281483863?q=80&w=1000&auto=format&fit=crop'],
        bio: 'Bookworm. 📚',
        safetyRating: 4.8,
        reviews: [
            { id: 217, author: 'Robert', rating: 5.0, comment: 'Interesting conversations about books.', date: '3 weeks ago' }
        ],
        job: 'Editor',
        education: 'Literature',
        height: '166 cm',
        location: 'Warsaw',
        lookingFor: 'Relationship',
        interests: ['Books', 'Writing', 'Tea']
    },
    {
        id: 12,
        name: 'Ryan',
        age: 29,
        gender: 'men',
        photos: ['https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1000&auto=format&fit=crop'],
        bio: 'Gamer. 🎮',
        safetyRating: 4.5,
        reviews: [
            { id: 218, author: 'Kevin', rating: 4.0, comment: 'Good teammate.', date: 'Yesterday' },
            { id: 219, author: 'Sarah', rating: 5.0, comment: 'Funny guy!', date: '4 days ago' }
        ],
        job: 'Developer',
        education: 'CS Degree',
        height: '183 cm',
        location: 'Warsaw',
        lookingFor: 'New Friends',
        interests: ['Gaming', 'Coding', 'Sci-Fi']
    },
    {
        id: 13,
        name: 'Chloe',
        age: 24,
        gender: 'women',
        photos: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop'],
        bio: 'Cat mom. 🐱',
        safetyRating: 4.9,
        reviews: [
            { id: 220, author: 'Mike', rating: 5.0, comment: 'Loves animals, very kind.', date: '1 week ago' }
        ],
        job: 'Vet Assistant',
        height: '160 cm',
        location: 'Warsaw',
        lookingFor: 'Relationship',
        interests: ['Cats', 'Animals', 'Volunteering']
    },
    {
        id: 14,
        name: 'William',
        age: 32,
        gender: 'men',
        photos: ['https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=1000&auto=format&fit=crop'],
        bio: 'Chef. 🍳',
        safetyRating: 4.6,
        reviews: [
            { id: 221, author: 'Gordon', rating: 3.5, comment: 'Food was good, service okay.', date: '2 days ago' },
            { id: 222, author: 'Alice', rating: 5.0, comment: 'Amazing cook!', date: '3 weeks ago' }
        ],
        job: 'Head Chef',
        education: 'Culinary School',
        height: '185 cm',
        location: 'Warsaw',
        lookingFor: 'Open to anything',
        interests: ['Cooking', 'Food', 'Wine']
    },
    {
        id: 15,
        name: 'Mia',
        age: 26,
        gender: 'women',
        photos: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop'],
        bio: 'Traveler. ✈️',
        safetyRating: 4.7,
        reviews: [
            { id: 223, author: 'Jack', rating: 4.5, comment: 'Great travel stories.', date: '5 days ago' }
        ],
        job: 'Flight Attendant',
        height: '170 cm',
        location: 'Warsaw',
        lookingFor: 'Fun',
        interests: ['Travel', 'Planes', 'Languages']
    }
];
