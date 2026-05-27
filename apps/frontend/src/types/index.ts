// Room types
export interface Room {
  id: string;
  name: string;
  type: 'shared' | 'private';
  capacity: number;
  pricePerNight: number;
  description: string;
  amenities: string[];
  images: string[];
  isActive: boolean;
  beds?: Bed[];
}

export interface Bed {
  id: string;
  bedNumber: number;
  roomId: string;
  isActive: boolean;
}

// Reservation types
export type ReservationStatus = 'pending_payment' | 'confirmed' | 'cancelled' | 'completed';

export interface Reservation {
  id: string;
  code: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestCountry?: string;
  guestAge?: number;
  checkInDate: string;
  checkOutDate: string;
  numberOfNights: number;
  roomId: string;
  room: Room;
  bedId?: string;
  bed?: Bed;
  totalAmount: number;
  paidAmount: number;
  refundedAmount: number;
  mercadoPagoId?: string;
  mercadoPagoStatus?: string;
  paymentLink?: string;
  status: ReservationStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReservationDTO {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestCountry?: string;
  guestAge?: number;
  checkInDate: string;
  checkOutDate: string;
  roomId: string;
  bedId?: string;
  notes?: string;
}

export interface CreateReservationResponse {
  reservation: Reservation;
  paymentUrl: string;
}

export interface AvailabilityCheck {
  roomId: string;
  checkIn: string;
  checkOut: string;
  bedId?: string;
}

export interface AvailabilityResponse {
  available: boolean;
  availableBeds?: string[];
}

// Contact Form
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

// Admin types
export interface Admin {
  id: string;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  admin: Admin;
  accessToken: string;
}

// API Response
export interface ApiError {
  error: string;
  details?: any;
}
