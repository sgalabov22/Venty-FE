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

// export interface LocationWorkingHours {
//   weekdayText: string[];
// }

// export interface LocationData {
//   formattedAddress: string;
//   geometry: google.maps.LatLng;
//   internationalPhoneNumber: string;
//   name: string;
//   openingHours: LocationWorkingHours;
//   photos: google.maps.places.PlacePhoto[];
//   placeId: string;
//   rating: number;
//   reviews: google.maps.places.PlaceReview[];
//   userRatingsTotal: number;
//   website: string;
// }
