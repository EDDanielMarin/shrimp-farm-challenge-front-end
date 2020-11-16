import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {AlertService} from './alert.service';

@Injectable()
export class DtoService {

  url = environment.baseUrl;
  auth = environment.baseUrl + 'auth/';
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }
    )
  };

  constructor(private http: HttpClient, private router: Router, private alertService: AlertService) {
  }

  signIn(data: any) {
    return this.http.post<any>(this.auth + 'login', data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getToken(): string {
    return sessionStorage.getItem('jwt');
  }

  execPostUser(params, data): Observable<any> {
    return this.http.post<any>(environment.baseUrl + params, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  execPost(params, data): Observable<any> {
    return this.http.post<any>(this.url + params, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  execPatch(params, data): Observable<any> {
    return this.http.patch<any>(this.url + params, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  execGet(params): Observable<any> {
    return this.http.get<any>(this.url + params, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  execPut(params, data): Observable<any> {

    return this.http.put(this.url + params, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  execDelete(params): Observable<any> {
    return this.http.delete(this.url + params, this.httpOptions);
  }

  execDeleteId(params): Observable<any> {
    return this.http.delete(this.url + params, this.httpOptions);
  }


  handleError(error: HttpErrorResponse) {

    let resp: any;
    if (error.error instanceof ErrorEvent) {
      resp = {status: 'Error', message: error.error.message, code: '500'};
    } else {
      resp = error.error;
      if (error.status === 401) {
        sessionStorage.clear();
        this.router.navigateByUrl('auth/');
      }
    }
    return throwError(resp);
  }


}
