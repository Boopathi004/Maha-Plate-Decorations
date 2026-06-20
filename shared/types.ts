export type EventType = string;
export type PackageType = 'basic' | 'premium' | 'elite';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: EventType;
  eventDate: string;
  plateCount: number;
  packageType: PackageType;
  specialRequests?: string;
  status: BookingStatus;
  totalPrice?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: number;
  clientName: string;
  clientEmail: string;
  rating: number;
  reviewText: string;
  eventType?: EventType;
  isApproved: boolean;
  createdAt: string;
  approvedAt?: string;
  updatedAt: string;
}

export interface GalleryImage {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  imageKey: string;
  eventType: EventType;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
