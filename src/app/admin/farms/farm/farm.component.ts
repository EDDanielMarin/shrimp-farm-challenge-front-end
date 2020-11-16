import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RequestService} from '../../../services/request.service';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent implements OnInit {
  @Input() farm: any;
  @Output() saveFarm: EventEmitter<any> = new EventEmitter();
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  submitted = false;
  farmForm: FormGroup;
  error: any;
  constructor(private  formBuilder: FormBuilder, private request: RequestService) {
    this.farmForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      active: [false, [Validators.required]],
    });
  }
  get f() {
    return this.farmForm.controls;
  }

  ngOnInit(): void {
    if (this.farm && this.farm._id) {
      const data = { name: this.farm.name, active: this.farm.active};
      this.farmForm.setValue({...data});
    }
  }

  onSave() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.farmForm.invalid) {
      return;
    }
    const param = {...this.farmForm.value};
    const id = this.farm && this.farm._id ? this.farm._id : undefined;
    if (id) {
      delete param._id;
      this.updateFarm(param);
    } else {
      this.addFarm(param);
    }
  }

  updateFarm(param: object) {
    this.saveFarm.emit(new Promise((resolve, reject) => {
      this.request.update('pound/' + this.farm._id, param).subscribe((resp: any) => {
        resolve(' updated  ');
        this.cleanForm();
      }, (error => reject(error.message)));
    }));
  }

  addFarm(param: object) {
    this.saveFarm.emit(new Promise((resolve, reject) => {
      this.request.saveUser('farm', param).subscribe((resp: any) => {
        resolve(' added ');
        this.cleanForm();
      }, (error => reject(error.message)));
    }));
  }
  cleanForm() {
    this.farmForm.reset();
  }
  close() {
    this.closeModal.emit('closed');
  }
}
