import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BedenService {
  constructor(private http: HttpClient) {
  }

  findAllBedenler(): Observable<any> {
    const url = `${environment.apiUrl}/referanslar/bedenler`;
    return this.http.get(url);
  }
}
