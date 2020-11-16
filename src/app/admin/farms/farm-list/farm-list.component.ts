import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RequestService} from '../../../services/request.service';
import {AlertService} from '../../../services/alert.service';
import {AppService} from '../../../app.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BlockUI, NgBlockUI} from 'ng-block-ui';

@Component({
  selector: 'app-farm-list',
  templateUrl: './farm-list.component.html',
  styleUrls: ['./farm-list.component.css']
})
export class FarmListComponent implements OnInit {
  @ViewChild('dialog') dialogMatSelect;
  @ViewChild('poundDialog') poundDialog;
  @BlockUI('element') blockUIElement: NgBlockUI;


  originalFarmsData: object[] = [];
  farmsData: any[] = [];
  // Table
  // Options
  searchKeys = ['name', 'active'];
  sortBy = 'role';
  sortDesc = false;
  perPage = 10;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;
  currentFarm: {};
  poundsSettings;
  currentSize = '';
  constructor(private appService: AppService, private modalService: NgbModal,
              private request: RequestService, private alertService: AlertService) {
    this.appService.pageTitle = 'FarmList';
    this.poundsSettings = [
      {name: 'Name'},
      {name: 'Size'},
      {name: 'Depth'}
    ];

  }
  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }
  ngOnInit(): void {
    this.blockUIElement.start();
    this.loadData();
  }
  openDialog() {
    this.currentFarm = {};
    this.modalService.open(this.dialogMatSelect);
  }

  update() {
    const data = this.filter(this.originalFarmsData);
    this.totalItems = data.length;
    this.sort(data);
    this.farmsData = this.paginate(data);
  }
  paginate(data) {
    const perPage = parseInt(String(this.perPage), 10);
    const offset = (this.currentPage - 1) * perPage;

    return data.slice(offset, offset + perPage);
  }

  filter(data) {
    const filter = this.filterVal.toLowerCase();
    return !filter ?
      data.slice(0) :
      data.filter(d => {
        return Object.keys(d)
          .filter(k => this.searchKeys.includes(k))
          .map(k => String(d[k]))
          .join('|')
          .toLowerCase()
          .indexOf(filter) !== -1 || !filter;
      });
  }
  sort(data) {
    data.sort((a: any, b: any) => {
      a = typeof (a[this.sortBy]) === 'string' ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      b = typeof (b[this.sortBy]) === 'string' ? b[this.sortBy].toUpperCase() : b[this.sortBy];

      if (a < b) {
        return this.sortDesc ? 1 : -1;
      }
      if (a > b) {
        return this.sortDesc ? -1 : 1;
      }
      return 0;
    });
  }
  loadData() {
    this.request.get('farm').subscribe((resp: any) => {
      this.originalFarmsData = resp.slice(0);
      this.update();
      this.blockUIElement.stop();
    });
  }

  setSort(key) {
    if (this.sortBy !== key) {
      this.sortBy = key;
      this.sortDesc = false;
    } else {
      this.sortDesc = !this.sortDesc;
    }

    this.currentPage = 1;
    this.update();
  }

  getFarm(farm: object) {
    this.currentFarm = farm;
    this.modalService.open(this.dialogMatSelect);
  }

  deleteFarm(id: string) {
    this.alertService.callbackAlert('Remove Farm', 'Farm will be deleted, continue?', 'question').then((x: any) => {
     if (x.isConfirmed) {
        this.request.delete('farm', id).subscribe(resp => {
          this.alertService.showToast(resp.message, 'success', 'success');
          this.loadData();
        }, (error) => {
          this.alertService.showToast(error.message, 'error', 'error');
        });
     }
    });
  }

  saveFarm(event: Promise<object>) {
    this.blockUIElement.start();
    this.closeDialog();
    event.then((x: any) => {
      this.loadData();
      this.alertService.showToast(x.message, 'Farm ' + x + 'successful', 'success');
      this.closeDialog();
    }).catch((err: any) => {
      this.alertService.showToast(err.message, 'Error', 'success');
    }).finally(() =>  {
      this.blockUIElement.stop();
    });
  }

  closeDialog($event?) {
    this.modalService.dismissAll();

  }

  getFarmSize(farm: any) {
    this.blockUIElement.start();
    this.request.get('farm/' + farm._id + '/size').subscribe(x => {
      this.blockUIElement.stop();
      this.currentFarm = farm;
      this.currentSize = x.data.size;
      this.modalService.open(this.poundDialog);
    });
  }
}
