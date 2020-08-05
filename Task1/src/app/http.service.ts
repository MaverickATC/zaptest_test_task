import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Card} from './app.component';

@Injectable()
export class HttpService{

  constructor(private http: HttpClient){ }

  getUsers(): Observable<Card[]> {
    return this.http.get('assets/phonebook.json').pipe(map(data => {
      return data['phoneCards'];
    }));
  }
}
