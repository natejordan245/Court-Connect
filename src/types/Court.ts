export interface Court {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  isBusy: boolean;
  isPrivate: boolean;
  userId: string;
  cost?: string;
  placeId?: string;
  requiresMembership: boolean;
  membershipDetails?: string;
  phoneNumber?: string;
  website?: string;
  imageUrl?: string;
  createdAt: Date;
}
