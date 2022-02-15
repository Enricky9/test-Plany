import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbAccordionModule, NgbAlertModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ClickOutsideModule } from 'ng-click-outside';

import { AutocompleteModule } from './components/autocomplete/autocomplete.module';
import { PipeModule } from 'app/shared/pipes/pipe.module';

//COMPONENTS
import { FooterComponent } from "./footer/footer.component";
import { VerticalMenuComponent } from "./vertical-menu/vertical-menu.component";
import { ModalComponent } from './components/modal/modal.component';

//DIRECTIVES
import { ToggleFullscreenDirective } from "./directives/toggle-fullscreen.directive";
import { SidebarLinkDirective } from './directives/sidebar-link.directive';
import { SidebarDropdownDirective } from './directives/sidebar-dropdown.directive';
import { SidebarAnchorToggleDirective } from './directives/sidebar-anchor-toggle.directive';
import { SidebarDirective } from './directives/sidebar.directive';
import { TopMenuDirective } from './directives/topmenu.directive';
import { TopMenuLinkDirective } from './directives/topmenu-link.directive';
import { TopMenuDropdownDirective } from './directives/topmenu-dropdown.directive';
import { TopMenuAnchorToggleDirective } from './directives/topmenu-anchor-toggle.directive';

import { MatchHeightModule } from 'app/shared/directives/match-height.directive';
import { NouisliderModule } from 'ng2-nouislider';
import { ChartistModule } from 'ng-chartist';
import { DragulaModule } from 'ng2-dragula';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChartsModule } from 'ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxMaskModule } from 'ngx-mask';
import { FluidHeightModule } from './directives/fluidHeight.directive';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';

@NgModule({
  exports: [
    CommonModule,
    FooterComponent,
    VerticalMenuComponent,    
    ToggleFullscreenDirective,
    SidebarDirective,
    TopMenuDirective,
    NgbModule,
    TranslateModule,
    FormsModule,
    ChartistModule,
    ChartsModule,
    MatchHeightModule,
    FluidHeightModule,
    NouisliderModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgSelectModule,
    NgxSpinnerModule,
    NgxDatatableModule,
    NgApexchartsModule,
    BsDatepickerModule,
    NgxMaskModule,    
  ],
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
    TranslateModule,
    FormsModule,    
    ReactiveFormsModule,
    PerfectScrollbarModule,
    ClickOutsideModule,
    AutocompleteModule,
    PipeModule,    
    DragulaModule.forRoot(),
    NgApexchartsModule,
    NgbDropdownModule,    
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(),    
    NgbAccordionModule,
    NgSelectModule,    
  ],
  declarations: [
    FooterComponent,
    /*NavbarComponent,*/
    VerticalMenuComponent,
    ToggleFullscreenDirective,
    SidebarLinkDirective,
    SidebarDropdownDirective,
    SidebarAnchorToggleDirective,
    SidebarDirective,
    TopMenuLinkDirective,
    TopMenuDropdownDirective,
    TopMenuAnchorToggleDirective,
    TopMenuDirective,
    ModalComponent,
    ComingSoonComponent,    
  ],
})
export class SharedModule {
  constructor(private bsLocaleService: BsLocaleService) {
    this.bsLocaleService.use("pt-br");
  }
}
