import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {FarmListComponent} from './farms/farm-list/farm-list.component';
import {PoundListComponent} from './pounds/pound-list/pound-list.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', redirectTo: 'farms' },
    { path: 'farms', component: FarmListComponent },
    { path: 'pounds', component: PoundListComponent }
  ])],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
