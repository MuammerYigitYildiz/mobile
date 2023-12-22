import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class IlService {
  constructor(private http: HttpClient) {
  }

  findAllIller(): Observable<any> {
    const url = `${environment.apiUrl}/referanslar/il`;
    return this.http.get(url);
  }
}
