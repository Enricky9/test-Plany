import { NgModule } from '@angular/core';
import { HomeRoutingModule } from "./home-routing.module";

import { HomeComponent } from "./home.component";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'app/shared/shared.module';



@NgModule({
  imports: [
    HomeRoutingModule,
    SharedModule,
  ],
  exports: [],
  declarations: [
    HomeComponent,
  ],
  providers: [NgbActiveModal],
})
export class HomeModule { }
