// account.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = 'http://localhost:8090/api/account/getAccountDetail';

  constructor(private http: HttpClient) {
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getGonulluByEmail(apiUrl: string): Observable<any> {
    return this.http.get(apiUrl);
  }

}
