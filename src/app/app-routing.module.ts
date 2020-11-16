import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';

// *******************************************************************************
// Layout

import {MainLayoutComponent} from './layout/main-layout/main-layout.component';

// *******************************************************************************
// Pages

import {HomeComponent} from './admin/home/home.component';

// *******************************************************************************
// Guard
import {AuthGuard} from './utils/guards/auth.guard';


// *******************************************************************************
// Routes

export const routes: Routes = [

  // {
  //   path: '', component: MainLayoutComponent, pathMatch: 'full', children: [
  //     {path: '', component: HomeComponent},
  //   ]
  // },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', component: MainLayoutComponent, loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },

  //
  // {
  //   path: 'page-2', component: MainLayoutComponent, children: [
  //     {path: '', component: Page2Component},
  //   ]
  // },

  // 404 Not Found page
  {path: '**', component: NotFoundComponent}

];

// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
