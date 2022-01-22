export interface LocationDetails {
    lat: number;
    lng: number;
}


export interface EventDetailsData {
    location: LocationDetails;
    icon: string;
    name: string;
    address: string; //formatted_address
    placeId: string;
    rating: number; // 1/5
    photos: string[];
}