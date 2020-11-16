import {Component, OnInit, ViewChild} from '@angular/core';
import {RequestService} from '../../../services/request.service';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {AppService} from '../../../app.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../../../services/alert.service';

@Component({
  selector: 'app-pound-list',
  templateUrl: './pound-list.component.html',
  styleUrls: ['./pound-list.component.css']
})
export class PoundListComponent implements OnInit {
  pounds = [];
  currentPound: any;
  @BlockUI('element') blockUIElement: NgBlockUI;

  @ViewChild('dialog') poundDialog;

  constructor(private appService: AppService, private modalService: NgbModal,
              private request: RequestService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.blockUIElement.start();
    this.request.get('pound').subscribe((resp: any) => {
      this.pounds = resp.slice(0);
      this.blockUIElement.stop();
    });
  }
  openDialog() {
    this.currentPound = {};
    this.modalService.open(this.poundDialog);
  }

  getPound(pound: any) {
      this.currentPound = pound;
      this.modalService.open(this.poundDialog);
  }

  deletePound(id: any) {
    this.alertService.callbackAlert('Remove Pound', 'Pound will be deleted, continue?', 'question').then((x: any) => {
      if (x.isConfirmed) {
        this.request.delete('pound', id).subscribe(resp => {
          this.alertService.showToast(resp.message, 'success', 'success');
          this.loadData();
        }, (error) => {
          this.alertService.showToast(error.message, 'error', 'error');
        });
      }
    });
  }
  savePound(event: Promise<object>) {
    this.blockUIElement.start();
    this.closeDialog();
    event.then((x: any) => {
      this.loadData();
      this.alertService.showToast(x.message, 'Farm ' + x + 'successful', 'success');
      this.closeDialog();
    }).catch((err: any) => {
      this.alertService.showToast(err.message, 'Error', 'error');
    }).finally(() =>  {
      this.blockUIElement.stop();
    });
  }

  closeDialog(event?) {
    this.modalService.dismissAll();

  }
}
