import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


// *******************************************************************************
// Layouts

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LayoutBlankComponent } from './layout-blank/layout-blank.component';


// *******************************************************************************
// Components

import { LayoutNavbarComponent } from './layout-navbar/layout-navbar.component';
import { LayoutSidenavComponent } from './layout-sidenav/layout-sidenav.component';
import { LayoutFooterComponent } from './layout-footer/layout-footer.component';


// *******************************************************************************
// Libs

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidenavModule } from '../../vendor/libs/sidenav/sidenav.module';


// *******************************************************************************
// Services

import { LayoutService } from './layout.service';


// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    SidenavModule
  ],
  declarations: [
    MainLayoutComponent,
    LayoutBlankComponent,

    LayoutNavbarComponent,
    LayoutSidenavComponent,
    LayoutFooterComponent
  ],
  providers: [
    LayoutService
  ]
})
export class LayoutModule { }
