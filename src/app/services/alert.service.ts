import {Injectable} from '@angular/core';
import Swal, {SweetAlertOptions} from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class AlertService {

  resp: boolean;

  constructor(public toastService: ToastrService) {
    this.resp = false;
  }

  // Types of Alerts
  // success
  // error
  // info
  // warning
  // question

  launchAlert(header: string, content: string, typeAlert: any) {
    Swal.fire(
      header,
      content,
      typeAlert
    );
  }

  callbackAlert(header: string, content: string, typeAlert: any) {
    this.resp = false;
    // @ts-ignore
    const options: SweetAlertOptions<any, any> = {
      title: header,
      text: content,
      icon: typeAlert,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showCancelButton: true,
      customClass: {confirmButton: 'btn btn-lg btn-success', cancelButton: 'btn btn-lg btn-default'}
    };
    return Swal.fire(options);
  }

  showToast(message, title, type) {
    const options = {
      tapToDismiss: true,
      closeButton: false,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-right',
      rtl: false
    };
    this.toastService[type](message, title, options);
  }
}
