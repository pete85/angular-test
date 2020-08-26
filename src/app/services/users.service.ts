import { Injectable } from '@angular/core';
import {Observable, throwError as observableThrowError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Post} from '../models/post';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient) { }

  getUsers(user_id): Observable<any> {
    let url;
    if (user_id) {
      url = 'https://jsonplaceholder.typicode.com/users/' + user_id;
    } else {
      url = 'https://jsonplaceholder.typicode.com/users';
    }
    return this._http
      .get(url).pipe(
        map((response: HttpResponse<User[]>) => response),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return observableThrowError(error);
  }
}
