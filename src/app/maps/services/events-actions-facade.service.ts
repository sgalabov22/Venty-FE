import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { EventCreateData, EventsActionService } from "..";

@Injectable({
    providedIn: 'root'
})
export class EventsActionFacadeService {
    constructor(
        private eventsActionsService: EventsActionService
    ) {}

    public createEvent(
        bodyParams: EventCreateData
    ): void {
        this.eventsActionsService.createEvent(bodyParams)
            .pipe(take(1))
            .subscribe();
    }
}