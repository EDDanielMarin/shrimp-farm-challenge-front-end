import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RequestService} from '../../../services/request.service';

@Component({
  selector: 'app-pound',
  templateUrl: './pound.component.html',
  styleUrls: ['./pound.component.css', '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class PoundComponent implements OnInit {
  @Input() pound: any;
  @Output() savePound: EventEmitter<any> = new EventEmitter();
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  submitted = false;
  poundForm: FormGroup;
  farms: [];

  constructor(private  formBuilder: FormBuilder, private request: RequestService) {
    this.poundForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      size: ['', [Validators.required]],
      depth: ['', [Validators.required]],
      farm: [null, [Validators.required]],
      active: [false, [Validators.required]],
    });
  }

  get f() {
    return this.poundForm.controls;
  }

  ngOnInit(): void {
    this.request.get('farm').subscribe(x => {
      this.farms = x;
    });
    if (this.pound && this.pound._id) {
      const data = {
        name: this.pound.name,
        active: this.pound.active,
        size: this.pound.size,
        depth: this.pound.depth,
        farm: this.pound.farm ? this.pound.farm._id : null
      };
      this.poundForm.setValue({...data});
    }
  }

  onSave() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.poundForm.invalid) {
      return;
    }
    const param = {...this.poundForm.value};
    const id = this.pound && this.pound._id ? this.pound._id : undefined;
    if (id) {
      delete param._id;
      this.updateFarm(param);
    } else {
      this.addFarm(param);
    }
  }

  updateFarm(param: object) {
    this.savePound.emit(new Promise((resolve, reject) => {
      this.request.update('pound/' + this.pound._id, param).subscribe((resp: any) => {
        resolve(' updated  ');
        this.cleanForm();
      }, (error => reject(error.message)));
    }));
  }

  addFarm(param: object) {
    this.savePound.emit(new Promise((resolve, reject) => {
      this.request.saveUser('pound', param).subscribe((resp: any) => {
        resolve(' added ');
        this.cleanForm();
        this.closeModal.emit('closed');
      }, (error => reject(error.message)));
    }));
  }

  cleanForm() {
    this.poundForm.reset();
  }

  close() {
    this.closeModal.emit('closed');
  }
}
