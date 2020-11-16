import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private appService: AppService, private alertService: AlertService) {
    this.appService.pageTitle = 'Home';
  }

  test() {
    this.alertService.showToast('Hello world', '111', 'success');
  }
}
