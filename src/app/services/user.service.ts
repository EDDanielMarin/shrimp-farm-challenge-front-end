import { Injectable } from '@angular/core';
import { DtoService } from './dto.service';
import {Router} from '@angular/router';

@Injectable()
export class UserService {

  user: any;
  token = '';

  constructor(private dto: DtoService,  public router: Router) {
    this.user = {};
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
      this.dto.signIn(credentials).subscribe((resp: any) => {
        this.user = resp.user;
        this.token = resp.token;
        resolve();
      },
        error => {
          reject(error);
        }
      );
    });
  }

  isLogged() {
    if (!sessionStorage.getItem('authUser')) {
      return null;
    }
    return JSON.parse(sessionStorage.getItem('authUser'));
  }
  currentUser() {
    let currentUser: any;
    let fullName: string;
    currentUser = JSON.parse(sessionStorage.getItem('authUser'));
    fullName = currentUser.name + ' ' + currentUser.last_name;
    return fullName;
  }

  logout() {
    sessionStorage.clear();
  }

  postQuery() {
    if (this.token && this.user) {
      sessionStorage.setItem('authUser', JSON.stringify(this.user));
      sessionStorage.setItem('jwt', this.token);
      this.router.navigate(['/']);
    }
  }

  register(credentials: { password: string; fullName: string; username: string }) {
    return this.dto.execPost('auth/signup', credentials);
  }
}
