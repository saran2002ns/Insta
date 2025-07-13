
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
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
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