import {NgModule} from "@angular/core";
import {HomeComponent} from "../components/home/home.component";

@NgModule({
    declarations:[HomeComponent],
    exports:[HomeComponent]
})
export class HomeModule {}