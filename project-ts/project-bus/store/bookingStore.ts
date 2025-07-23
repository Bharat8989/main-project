import { create } from 'zustand';

interface BookingState {
  selectedSeats: number[];
  selectedBus: any;
  searchParams: {
    source: string;
    destination: string;
    date: string;
  };
  setSelectedSeats: (seats: number[]) => void;
  setSelectedBus: (bus: any) => void;
  setSearchParams: (params: any) => void;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedSeats: [],
  selectedBus: null,
  searchParams: {
    source: '',
    destination: '',
    date: '',
  },
  setSelectedSeats: (seats) => set({ selectedSeats: seats }),
  setSelectedBus: (bus) => set({ selectedBus: bus }),
  setSearchParams: (params) => set({ searchParams: params }),
  clearBooking: () => set({ selectedSeats: [], selectedBus: null }),
}));