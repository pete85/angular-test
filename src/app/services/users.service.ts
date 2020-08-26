import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError as observableThrowError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _usersSource = new BehaviorSubject<User[]>(null);
  public users = this._usersSource.asObservable();

  constructor(private _http: HttpClient) {
  }

  setUsers(users: User[]) {
    this._usersSource.next(users);
  }

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
