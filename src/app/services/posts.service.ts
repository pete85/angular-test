import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError as observableThrowError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Post} from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private _http: HttpClient) {
  }

  getPosts(post_id, user_id): Observable<any> {
    const params = new HttpParams()
      .set('userId', JSON.stringify(user_id));
    let url;
    if (post_id) {
      url = 'https://jsonplaceholder.typicode.com/posts/' + post_id;
    } else {
      url = 'https://jsonplaceholder.typicode.com/posts';
    }
    if (user_id) {
      return this._http
        .get(url, {params: params}).pipe(
          map((response: HttpResponse<Post[]>) => response),
          catchError(this.handleError)
        );
    } else {
      return this._http
        .get(url).pipe(
          map((response: HttpResponse<Post[]>) => response),
          catchError(this.handleError)
        );
    }
  }

  createPost(body): Observable<any> {
    return this._http.post('https://jsonplaceholder.typicode.com/posts', body).pipe(
      map((response: HttpResponse<any>) => {
        return {response}
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return observableThrowError(error);
  }
}
