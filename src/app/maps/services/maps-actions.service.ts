import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class MapsActionsService {
  private service: google.maps.places.AutocompleteService;

  constructor() {
    this.service = new google.maps.places.AutocompleteService();
  }
    
  public loadPredictions(
    value: string
  ): void {
    const getPredictions = (
      predictions: google.maps.places.QueryAutocompletePrediction[] | null,
      status: google.maps.places.PlacesServiceStatus
    ): void => {
    if (status != google.maps.places.PlacesServiceStatus.OK || !predictions) {
      return;
    }

    predictions.forEach((prediction: any) => {
      this.getPlaceDetails(prediction.place_id);
    });
    }

    if (value.length > 0) {
      this.service.getQueryPredictions({ input: value }, getPredictions);
    }
  }

  private getPlaceDetails(
    placeId: string
  ): void {
    // const request = {
    //   placeId: placeId,
    // };
  
    // const service = new google.maps.places.PlacesService(this.map);
  
    // service.getDetails(request, (place, status) => {
    //   if (
    //     status === google.maps.places.PlacesServiceStatus.OK &&
    //     place &&
    //     place.geometry &&
    //     place.geometry.location
    //   ) {
    //     console.log('Place details: ');
    //     console.log(place);
    //   }
    // });
  }
}