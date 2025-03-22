import { Court } from '../types/Court';

/**
 * Mock data for courts in the BYU/UVU area
 * 
 * @deprecated This mock data is temporary and will be replaced in the next version with:
 * - Public courts: Real-time data from Google Places API
 * - Private courts: Data from Firebase with user authentication
 * 
 * Google Places API Integration Plan:
 * 1. Use Places API to search for parks and recreation centers
 * 2. Filter results using keywords: "pickleball", "courts", "recreation"
 * 3. Get additional details like photos, ratings, and reviews
 * 4. Use Distance Matrix API to calculate accurate distances
 * 5. Use Places Photos API to get high-quality location images
 */

export const mockPrivateCourts: Court[] = [
  {
    id: '1',
    name: 'BYU Richards Building Courts',
    address: '1000 N 800 E, Provo, UT 84604',
    distance: '0.2 miles',
    rating: 4.8,
    isBusy: true,
    isPrivate: true,
    userId: 'demo-user-id',
    requiresMembership: true,
    membershipDetails: 'BYU Student/Faculty ID Required',
    cost: '0',
    imageUrl: 'https://images.unsplash.com/photo-1624914482740-8150495d1f97?q=80&w=2400&auto=format&fit=crop',
    createdAt: new Date(),
    phoneNumber: '(801) 422-4444',
    website: 'https://studentwellness.byu.edu/facilities'
  },
  {
    id: '2',
    name: 'UVU Student Life and Wellness Center',
    address: '800 W University Pkwy, Orem, UT 84058',
    distance: '3.5 miles',
    rating: 4.7,
    isBusy: false,
    isPrivate: true,
    userId: 'demo-user-id',
    requiresMembership: true,
    membershipDetails: 'UVU Student/Faculty ID Required',
    cost: '0',
    imageUrl: 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?q=80&w=2400&auto=format&fit=crop',
    createdAt: new Date(),
    phoneNumber: '(801) 863-5555',
    website: 'https://www.uvu.edu/slwc/'
  },
  {
    id: '3',
    name: 'Provo Recreation Center',
    address: '320 W 500 N, Provo, UT 84601',
    distance: '1.8 miles',
    rating: 4.9,
    isBusy: true,
    isPrivate: true,
    userId: 'demo-user-id',
    requiresMembership: true,
    membershipDetails: 'Membership or Day Pass Required',
    cost: '7',
    imageUrl: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?q=80&w=2400&auto=format&fit=crop',
    createdAt: new Date(),
    phoneNumber: '(801) 852-6600',
    website: 'https://www.provo.org/community/recreation-center'
  },
  {
    id: '4',
    name: 'VASA Fitness Orem',
    address: '1200 N State St, Orem, UT 84057',
    distance: '4.2 miles',
    rating: 4.5,
    isBusy: false,
    isPrivate: true,
    userId: 'demo-user-id',
    requiresMembership: true,
    membershipDetails: 'VASA Membership Required',
    cost: '10',
    imageUrl: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=2400&auto=format&fit=crop',
    createdAt: new Date(),
    phoneNumber: '(801) 224-2255',
    website: 'https://vasafitness.com/'
  }
];

export const mockPublicCourts: Court[] = [
  {
    id: 'kiwanis-1',
    name: 'Kiwanis Park',
    address: '820 N 1100 E, Provo, UT 84604',
    distance: '0.5 miles',
    rating: 4.6,
    isBusy: true,
    isPrivate: false,
    userId: '',
    requiresMembership: false,
    cost: '0',
    imageUrl: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=2400&auto=format&fit=crop',
    createdAt: new Date(),
    placeId: 'ChIJn9_g2TqUUocR3XQj5TK2o0E',
    phoneNumber: '(801) 852-6606',
    website: 'https://www.provo.org/community/parks-and-recreation/parks/kiwanis'
  },
  {
    id: 'lions-2',
    name: 'Lions Park',
    address: '1280 N 950 W, Provo, UT 84604',
    distance: '1.2 miles',
    rating: 4.4,
    isBusy: false,
    isPrivate: false,
    userId: '',
    requiresMembership: false,
    cost: '0',
    imageUrl: 'https://images.unsplash.com/photo-1568480289356-5a75d0fd47fc?q=80&w=2400&auto=format&fit=crop',
    createdAt: new Date(),
    placeId: 'ChIJXXXX-XXXUXXXX',
    phoneNumber: '(801) 852-6606',
    website: 'https://www.provo.org/community/parks-and-recreation/parks/lions'
  },
  {
    id: 'scera-3',
    name: 'SCERA Park',
    address: '600 S State St, Orem, UT 84058',
    distance: '2.8 miles',
    rating: 4.7,
    isBusy: true,
    isPrivate: false,
    userId: '',
    requiresMembership: false,
    cost: '0',
    imageUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=2400&auto=format&fit=crop',
    createdAt: new Date(),
    placeId: 'ChIJYYYY-YYYYUYYY',
    phoneNumber: '(801) 229-7000',
    website: 'https://www.orem.org/scera-park/'
  },
  {
    id: 'nielsen-4',
    name: 'Nielsen\'s Grove Park',
    address: '2000 N 400 E, Orem, UT 84057',
    distance: '3.5 miles',
    rating: 4.5,
    isBusy: false,
    isPrivate: false,
    userId: '',
    requiresMembership: false,
    cost: '0',
    imageUrl: 'https://images.unsplash.com/photo-1573155993874-d5d48af862ba?q=80&w=2400&auto=format&fit=crop',
    createdAt: new Date(),
    placeId: 'ChIJZZZZ-ZZZZUZZZ',
    phoneNumber: '(801) 229-7000',
    website: 'https://www.orem.org/nielsens-grove-park/'
  },
  {
    id: 'rotary-5',
    name: 'Rotary Park',
    address: '1000 S Main St, Orem, UT 84058',
    distance: '2.1 miles',
    rating: 4.3,
    isBusy: false,
    isPrivate: false,
    userId: '',
    requiresMembership: false,
    cost: '0',
    imageUrl: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?q=80&w=2400&auto=format&fit=crop',
    createdAt: new Date(),
    placeId: 'ChIJWWWW-WWWWUWWW',
    phoneNumber: '(801) 229-7000',
    website: 'https://www.orem.org/rotary-park/'
  }
]; 