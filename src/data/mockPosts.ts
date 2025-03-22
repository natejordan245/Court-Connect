export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  isClubPost: boolean;
  clubName?: string;
}

export const mockPosts: Post[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'John Smith',
    userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    content: 'Anyone down to play this afternoon at Orem Park? Looking for 3.5+ skill level!',
    timestamp: new Date('2024-03-21T14:30:00'),
    likes: 5,
    comments: 3,
    isClubPost: false
  },
  {
    id: '2',
    userId: 'club1',
    userName: 'Orem Sports',
    userAvatar: 'https://example.com/club1.jpg',
    content: '🎉 Limited Time Promotion! Get 20% off on all memberships this week. Come join our pickleball community!',
    timestamp: new Date('2024-03-21T10:00:00'),
    likes: 15,
    comments: 8,
    isClubPost: true,
    clubName: 'Orem Sports Club'
  },
  {
    id: '3',
    userId: 'user2',
    userName: 'Sarah Johnson',
    userAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    content: "Looking for a consistent morning playing partner! I'm usually free from 7-9 AM. Intermediate level.",
    timestamp: new Date('2024-03-21T08:15:00'),
    likes: 7,
    comments: 4,
    isClubPost: false
  },
  {
    id: '4',
    userId: 'club2',
    userName: 'Provo Pickleball',
    userAvatar: 'https://example.com/club2.jpg',
    content: 'Join us this Saturday for our monthly tournament! All skill levels welcome. Register now!',
    timestamp: new Date('2024-03-20T16:45:00'),
    likes: 22,
    comments: 12,
    isClubPost: true,
    clubName: 'Provo Pickleball Club'
  },
  {
    id: '5',
    userId: 'user3',
    userName: 'Mike Wilson',
    content: 'New to the area! Looking for playing partners near Pleasant Grove. 4.0 skill level.',
    timestamp: new Date('2024-03-20T15:20:00'),
    likes: 3,
    comments: 6,
    isClubPost: false
  },
  {
    id: '6',
    userId: 'user4',
    userName: 'Emily Chen',
    userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    content: 'Just got some new Selkirk paddles! Anyone want to test them out at BYU courts tonight?',
    timestamp: new Date('2024-03-20T13:45:00'),
    likes: 12,
    comments: 5,
    isClubPost: false
  },
  {
    id: '7',
    userId: 'club3',
    userName: 'BYU Pickleball',
    userAvatar: 'https://example.com/club3.jpg',
    content: '🏆 Congratulations to our tournament winners! Check out the photos from yesterday\'s event.',
    timestamp: new Date('2024-03-20T11:30:00'),
    likes: 45,
    comments: 15,
    isClubPost: true,
    clubName: 'BYU Pickleball Club'
  },
  {
    id: '8',
    userId: 'user5',
    userName: 'David Martinez',
    userAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    content: 'Starting a weekly morning drill session at Kiwanis Park. All levels welcome! DM for details.',
    timestamp: new Date('2024-03-20T09:15:00'),
    likes: 18,
    comments: 9,
    isClubPost: false
  },
  {
    id: '9',
    userId: 'club4',
    userName: 'Utah Valley Pickleball',
    userAvatar: 'https://example.com/club4.jpg',
    content: 'New courts opening next month! Pre-register for membership and get exclusive early access.',
    timestamp: new Date('2024-03-19T16:20:00'),
    likes: 67,
    comments: 23,
    isClubPost: true,
    clubName: 'Utah Valley Pickleball Association'
  },
  {
    id: '10',
    userId: 'user6',
    userName: 'Rachel Thompson',
    userAvatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    content: 'Anyone interested in forming a competitive women\'s doubles team? Looking for 4.5+ players.',
    timestamp: new Date('2024-03-19T14:10:00'),
    likes: 9,
    comments: 7,
    isClubPost: false
  }
];
