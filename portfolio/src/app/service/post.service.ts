import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getpost( post: string ): Observable<string> {
    return this.http.get('assets/blog/post/' + post + '.md', {responseType:'text'} );
  }
}
