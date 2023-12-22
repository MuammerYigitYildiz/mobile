// map.service.ts

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) {
  }

  findAllIller(): Observable<any> {
    const url = `${environment.apiUrl}/referanslar/il`;
    return this.http.get(url);
  }

}
