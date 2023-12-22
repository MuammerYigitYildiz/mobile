import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CinsiyetService {
  constructor(private http: HttpClient) {
  }

  findAllCinsiyetler(): Observable<any> {
    const url = `${environment.apiUrl}/referanslar/cinsiyetler`;
    return this.http.get(url);
  }
}
