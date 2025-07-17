
// export const HomeSideBar = ['home','search','explore','reels','messages','notifications','create','profile','more'];
export const sidebarItems = [
    { icon: "fa-solid fa-house", name: "Home", path: "/" },
    { icon: "fa-solid fa-magnifying-glass", name: "Search" },
    { icon: "fa-regular fa-compass", name: "Explore", path: "/explore" },
    { icon: "fa-regular fa-circle-play", name: "Reels", path: "/reels" },
    { icon: "bi bi-chat-quote", name: "Message", path: "/message" },
    { icon: "fa-regular fa-heart", name: "Notifications" },
    { icon: "fa-regular fa-square-plus", name: "Create", path: "/create" },
    { icon: "fa-regular fa-circle-user", name: "Profile", path: "/profile" },
    { icon: "bi bi-list", name: "More", path: "/more" }
];
export const MAIN_ROUTES = [
  '/', '/explore', '/reels', '/message', '/create', '/profile', '/more'
];
export const notifications = [
    {
      id: 1,
      user: 'john_doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      message: 'liked your photo.',
      time: '2h',
    },
    {
      id: 2,
      user: 'jane_smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      message: 'started following you.',
      time: '3h',
    },
    {
      id: 3,
      user: 'mike_wilson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      message: 'commented: Nice shot!',
      time: '5h',
    },
    {
      id: 4,
      user: 'alex_brown',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      message: 'mentioned you in a comment.',
      time: '1d',
    },
    {
      id: 5,
      user: 'mike_wilson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      message: 'commented: Nice shot!',
      time: '5h',
    },
    {
      id: 6,
      user: 'alex_brown',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      message: 'mentioned you in a comment.',
      time: '1d',
    },{
      id: 7,
      user: 'mike_wilson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      message: 'commented: Nice shot!',
      time: '5h',
    },
    {
      id: 8,
      user: 'alex_brown',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      message: 'mentioned you in a comment.',
      time: '1d',
    },
  ]
// Sample user data for search functionality
export const sampleUsers = [
  {
    id: 1,
    username: "john_doe",
    fullName: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    isVerified: true,
    isFollowing: false
  },
  {
    id: 2,
    username: "jane_smith",
    fullName: "Jane Smith",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    isVerified: false,
    isFollowing: true
  },
  {
    id: 3,
    username: "mike_wilson",
    fullName: "Mike Wilson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    isVerified: true,
    isFollowing: false
  },
  {
    id: 4,
    username: "sarah_jones",
    fullName: "Sarah Jones",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    isVerified: false,
    isFollowing: false
  },
  {
    id: 5,
    username: "alex_brown",
    fullName: "Alex Brown",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    isVerified: true,
    isFollowing: true
  }
];
// Sample login users for authentication
export const loginUsers = [
  {
    userIdName: "chitti_robo",
    password: "chitti123",
    userName: "Chitti 3.0",
    profilePictureUrl: "https://i.postimg.cc/HkHm4bbd/chitti.jpg",
    bio: "Photographer & Traveler"
  },
  {
    userIdName: "ra_one",
    password: "raone123",
    userName: "ra one",
    profilePictureUrl: "https://e0.pxfuel.com/wallpapers/725/560/desktop-wallpaper-colorful-bollywood-shahrukh-khan-from-ra-one-movie-ra-one.jpg",
    bio: "Coffee lover & Blogger"
  },
  {
    userIdName: "mike_wilson",
    password: "wilsonpass",
    userName: "Mike Wilson",
    profilePictureUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Fitness enthusiast"
  },
  {
    userIdName: "alex_brown",
    password: "brownie!",
    userName: "Alex Brown",
    profilePictureUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    bio: "Music & Art"
  }
];
export const posts = [
  {
    id: 1,
    user: sampleUsers[0],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
    caption: 'Enjoying the beautiful sunset! 🌅',
    likes: 120,
    comments: [
      { user: sampleUsers[1], text: 'Amazing view!' },
      { user: sampleUsers[2], text: 'Wow, so cool!' }
    ],
    time: '2 hours ago'
  },
  {
    id: 2,
    user: sampleUsers[2],
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600',
    caption: 'Hiking adventures 🥾',
    likes: 89,
    comments: [
      { user: sampleUsers[0], text: 'Looks fun!' }
    ],
    time: '4 hours ago'
  },
  {
    id: 3,
    user: sampleUsers[3],
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600',
    caption: 'Coffee break ☕',
    likes: 45,
    comments: [],
    time: '1 day ago'
  },
  // New posts
  {
    id: 4,
    user: sampleUsers[1],
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600',
    caption: 'City lights at night ✨',
    likes: 67,
    comments: [
      { user: sampleUsers[2], text: 'So vibrant!' }
    ],
    time: '3 hours ago'
  },
  {
    id: 5,
    user: sampleUsers[4] || sampleUsers[0],
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600',
    caption: 'Nature walk 🌳',
    likes: 102,
    comments: [
      { user: sampleUsers[1], text: 'Love this place!' },
      { user: sampleUsers[3], text: 'So peaceful.' }
    ],
    time: '5 hours ago'
  },
  {
    id: 6,
    user: sampleUsers[0],
    image: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=600',
    caption: 'Throwback to last summer ☀️',
    likes: 150,
    comments: [
      { user: sampleUsers[4] || sampleUsers[1], text: 'Miss those days!' }
    ],
    time: '2 days ago'
  },
  {
    id: 7,
    user: sampleUsers[1],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=601',
    caption: 'Sunrise over the hills 🌄',
    likes: 77,
    comments: [
      { user: sampleUsers[2], text: 'Beautiful!' }
    ],
    time: '3 days ago'
  },
  {
    id: 8,
    user: sampleUsers[2],
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=601',
    caption: 'Urban jungle 🏙️',
    likes: 54,
    comments: [
      { user: sampleUsers[0], text: 'Nice shot!' }
    ],
    time: '4 days ago'
  },
  {
    id: 9,
    user: sampleUsers[3],
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=601',
    caption: 'Morning coffee vibes ☕',
    likes: 99,
    comments: [
      { user: sampleUsers[1], text: 'Need coffee now!' }
    ],
    time: '5 days ago'
  },
  {
    id: 10,
    user: sampleUsers[4] || sampleUsers[0],
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=601',
    caption: 'City at dusk 🌆',
    likes: 120,
    comments: [
      { user: sampleUsers[2], text: 'Love the colors!' }
    ],
    time: '6 days ago'
  },
  {
    id: 11,
    user: sampleUsers[0],
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=602',
    caption: 'Forest adventure 🌲',
    likes: 88,
    comments: [
      { user: sampleUsers[3], text: 'So green!' }
    ],
    time: '1 week ago'
  },
  {
    id: 12,
    user: sampleUsers[1],
    image: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=601',
    caption: 'Summer fun at the beach 🏖️',
    likes: 134,
    comments: [
      { user: sampleUsers[4] || sampleUsers[2], text: 'Wish I was there!' }
    ],
    time: '1 week ago'
  },
  {
    id: 13,
    user: sampleUsers[2],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=602',
    caption: 'Evening stroll 🚶‍♂️',
    likes: 56,
    comments: [
      { user: sampleUsers[0], text: 'Nice walk!' }
    ],
    time: '8 days ago'
  },
  {
    id: 14,
    user: sampleUsers[3],
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=602',
    caption: 'City lights at night 🌃',
    likes: 78,
    comments: [
      { user: sampleUsers[1], text: 'So bright!' }
    ],
    time: '9 days ago'
  },
  {
    id: 15,
    user: sampleUsers[4] || sampleUsers[0],
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=602',
    caption: 'Quiet moments 📚',
    likes: 61,
    comments: [
      { user: sampleUsers[2], text: 'Love this.' }
    ],
    time: '10 days ago'
  },
  {
    id: 16,
    user: sampleUsers[0],
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=602',
    caption: 'Downtown adventures 🚗',
    likes: 110,
    comments: [
      { user: sampleUsers[3], text: 'Let’s go!' }
    ],
    time: '11 days ago'
  }
];

export const stories = [
  { id: 1, name: 'vignesh_th...', avatar: sampleUsers[0].avatar, src: 'https://pixeldrain.com/api/file/BF9gAoBf', type: 'video', viewed: false },
  { id: 2, name: 'zoho', avatar: sampleUsers[1].avatar, src: 'https://pixeldrain.com/api/file/fyGNXF6a', type: 'video', viewed: false },
  { id: 3, name: '_mr.naasif_', avatar: sampleUsers[2].avatar, src: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'video', viewed: false },
  { id: 4, name: '__y._o_g_e', avatar: sampleUsers[3].avatar, src: 'https://www.w3schools.com/html/movie.mp4', type: 'video', viewed: false },
  { id: 5, name: 'pri_sreeni_', avatar: sampleUsers[4]?.avatar || sampleUsers[0].avatar, src: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'video', viewed: false },
  { id: 6, name: 'babisha_s...', avatar: sampleUsers[1].avatar, src: 'https://www.w3schools.com/html/movie.mp4', type: 'video', viewed: false },
  { id: 7, name: 'vignesh_th...', avatar: sampleUsers[0].avatar, src: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'video', viewed: false },
  { id: 8, name: 'zoho', avatar: sampleUsers[1].avatar, src: 'https://www.w3schools.com/html/movie.mp4', type: 'video', viewed: false },
  { id: 9, name: '_mr.naasif_', avatar: sampleUsers[2].avatar, src: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'video', viewed: false },
  { id: 10, name: '__y._o_g_e', avatar: sampleUsers[3].avatar, src: 'https://www.w3schools.com/html/movie.mp4', type: 'video', viewed: false },
  { id: 11, name: 'pri_sreeni_', avatar: sampleUsers[4]?.avatar || sampleUsers[0].avatar, src: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'video', viewed: false },
  { id: 12, name: 'babisha_s...', avatar: sampleUsers[1].avatar, src: 'https://www.w3schools.com/html/movie.mp4', type: 'video', viewed: false }
];