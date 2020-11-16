import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmComponent } from './farms/farm/farm.component';
import { PoundComponent } from './pounds/pound/pound.component';
import {AdminRoutingModule} from './admin-routing.module';
import { FarmListComponent } from './farms/farm-list/farm-list.component';
import { PoundListComponent } from './pounds/pound-list/pound-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbAlertModule, NgbPaginationModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {BlockUIModule} from 'ng-block-ui';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgSelectModule} from '@ng-select/ng-select';



@NgModule({
  declarations: [FarmComponent, PoundComponent, FarmListComponent, PoundListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NgbPaginationModule,
    BlockUIModule,
    NgbTooltipModule,
    NgbAlertModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgSelectModule
  ]
})
export class AdminModule { }
