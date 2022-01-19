import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MapsComponent } from "./containers";
import { MapsRoutingModule } from "./maps-routing.module";
import { PurpleBackgroundModule } from '@app/resources/purple-background';
import {InputTextModule} from 'primeng/inputtext';


@NgModule({
    declarations: [MapsComponent],
    imports:[
        CommonModule,
        MapsRoutingModule,
        PurpleBackgroundModule,
        InputTextModule
        // AgmCoreModule.forRoot({
        //     apiKey: 'AIzaSyBlzs88A9ls5GLMa0LW5Sl8ge8uzVcPTFY',
        //     libraries: ['places']
        // })
    ]
})
export class MapsModule {}