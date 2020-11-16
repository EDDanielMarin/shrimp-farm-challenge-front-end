import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import {UserService} from '../../services/user.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-authentication-register-v1',
  templateUrl: './register.component.html',
  styleUrls: [
    '../../../vendor/styles/pages/authentication.scss'
  ]
})
export class RegisterComponent {
  constructor(private appService: AppService, public userService: UserService, private alertService: AlertService) {
    this.appService.pageTitle = 'Register';
  }

  credentials = {
    fullName: '',
    username: '',
    password: ''
  };
  loading = false;
  register() {
    this.loading = true;
    this.userService.register(this.credentials).subscribe(x => {
      this.alertService.showToast('Success', 'Success', 'info');
      this.userService.router.navigateByUrl('/auth');
    }, err => {
      this.alertService.showToast(err.message, 'Error in registration', 'error');
      this.loading = false;
    });
  }
}
