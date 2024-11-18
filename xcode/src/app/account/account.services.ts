// account.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = `${environment.apiUrl}/account/getAccountDetail`;

  constructor(private http: HttpClient) {
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getGonulluByEmail(apiUrl: string): Observable<any> {
    return this.http.get(apiUrl);
  }

}
