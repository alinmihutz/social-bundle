/* Modules */
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Ng2BootstrapModule} from "ng2-bootstrap/ng2-bootstrap";
import {routing} from "./app.routing";
import {HttpModule} from "@angular/http";
import {Ng2TabModule} from "ng2-tab";
import {FormsModule} from "@angular/forms";
import {AgmCoreModule} from 'angular2-google-maps/core';

import {AppComponent} from './app.component';
import {appComponents} from './components/components';
import {appServices} from './services/services';
import {GoogleMap} from "./components/shared/google/google-map";
import {Slider} from './components/shared/directives/slider';

@NgModule({
    imports: [
        BrowserModule,
        Ng2BootstrapModule,
        HttpModule,
        routing,
        Ng2TabModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBMVW_8OE3CFZpl4wpuOiuMM6GZfyJKRU4'
        })
    ],
    declarations: [
        AppComponent,
        ...appComponents,
        GoogleMap,
        Slider
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        ...appServices
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule { }
