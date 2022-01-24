export interface EventInfo {
  name: string;
  createdOn: string;
}

export interface InfoTextData {
  agenda: string;
  goals: string;
  nextSteps: string;
}

export interface GuestList {
  guests: {
    fullName: string;
    email: string;
    status: string;
    profilePic: string;
  }[];
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

export interface SearchUser {
  fullName: string;
  email: string;
  profilePic: string;
}
