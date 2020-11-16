import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: RegisterComponent }
  ])],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
