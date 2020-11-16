import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import {UserService} from '../../services/user.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-authentication-login-v1',
  templateUrl: './login.component.html',
  styleUrls: [
    '../../../vendor/styles/pages/authentication.scss'
  ]
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };
  loading = false;
  constructor(private appService: AppService, public userService: UserService, private alertService: AlertService) {
    this.appService.pageTitle = 'Login';
  }
  login() {
    this.loading = true;
    this.userService.login(this.credentials).then(x => {
      this.userService.postQuery();
      this.alertService.showToast('Welcome', 'Success', 'info');

    }).catch(err => {
      this.alertService.showToast(err.message, 'Not allowed', 'error');
    }).finally(()  =>  this.loading = false);
  }
}
