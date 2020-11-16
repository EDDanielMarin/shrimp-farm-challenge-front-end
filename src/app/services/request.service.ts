import { Injectable } from '@angular/core';
import {DtoService} from './dto.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private dto: DtoService) { }
  get(path) {
    return this.dto.execGet( path);
  }

  saveUser(path, data) {
    return this.dto.execPostUser( path, data);
  }

  save(path, data) {
    return this.dto.execPost( path, data);
  }

  update(path, data) {
    return this.dto.execPatch( path, data);
  }

  delete(path, param) {
    return this.dto.execDeleteId( path + '/' + param);
  }

  find(path, param) {
    return this.dto.execGet( path + '/' + param);
  }
  findBody(path, param) {
    return this.dto.execPost( path, param);
  }

  executeLogin(param) {
    return this.dto.execPost('login', param);
  }


}
