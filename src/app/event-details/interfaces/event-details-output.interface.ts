export interface UpdateEventData {
  start_date: string;
  end_date: string;
  event_title: string;
  description: string;
}

export interface UpdateGuestStatus {
  eventId: number;
  guestId: number;
  status: string;
}
