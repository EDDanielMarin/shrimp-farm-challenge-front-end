import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// *******************************************************************************
// NgBootstrap

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// *******************************************************************************
// App

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppService } from './app.service';
import { LayoutModule } from './layout/layout.module';

// *******************************************************************************
// Pages

import { HomeComponent } from './admin/home/home.component';
import {AlertService} from './services/alert.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthGuard } from './utils/guards/auth.guard';
import {TokenInterceptor} from './utils/guards/token.interceptor';
import {DtoService} from './services/dto.service';
import {UtilService} from './services/util.service';
import {DatePipe, DecimalPipe} from '@angular/common';
import {RequestService} from './services/request.service';
import {UserService} from './services/user.service';
import {BlockUIModule} from 'ng-block-ui';
import {DragulaModule} from 'ng2-dragula';
import {RouterModule} from '@angular/router';
// *******************************************************************************
//
// *******************************************************************************
// Ngx-SweetAlert2

export async function provideSwal() {
  return Swal.mixin({
    buttonsStyling: false,
    customClass: {
      confirmButton: 'btn btn-lg btn-primary',
      cancelButton: 'btn btn-lg btn-default'
    }
  });
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,

    // Pages
    HomeComponent,
  ],

  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // App
    RouterModule.forRoot(routes, { useHash: true }),
    // libs
    AppRoutingModule,
    LayoutModule,
    SweetAlert2Module.forRoot({ provideSwal }),
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
      newestOnTop: true
    }),
    BlockUIModule.forRoot(),
    DragulaModule.forRoot(),


  ],

  providers: [
    Title,
    AppService,
    AlertService,
    UtilService,
    DatePipe,
    DecimalPipe,
    AuthGuard,
    DtoService,
    RequestService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
