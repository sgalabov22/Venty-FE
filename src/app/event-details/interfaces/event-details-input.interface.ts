export interface EventInfo {
  id: number;
  event_title: string;
  start_date: string;
  end_date: string;
  goal: string;
  agenda: string;
  description: string;
  location_id: string;
}

export interface InfoTextData {
  agenda: string;
  goal: string;
  description: string;
}

export interface Guest {
  guest_user_account: GuestUserAccount;
  event: number;
  status: string;
}

export interface GuestUserAccount {
  fullname: string;
  email: string;
  id: number;
  profile_picture: string;
}

export interface LocationData {
  images: {
    url: string;
  }[];
  name: string;
  location: string;
  openTime: string;
  closingTime: string;
  fbPage: string;
}

export interface ReviewsList {
  reviews: {
    fullName: string;
    rating: number;
    createdOn: string;
  };
  count: number;
}
