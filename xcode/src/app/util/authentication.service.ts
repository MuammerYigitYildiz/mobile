import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {EventEmitter} from '@angular/core';
import {FormControl, ɵValue} from "@angular/forms";
import {AccountService} from "../account/account.services";

const AUTH_KEY = 'auth';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isAuthenticated2 = false;


  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private accountService: AccountService,) {

    this.isAuthenticated2 = JSON.parse(localStorage.getItem(AUTH_KEY) || 'false');
  }

  authenticate(credentials: any, token: string): Observable<any> {
    credentials.reCaptchaToken = token;
    const requestOptions: Object = {
      responseType: 'text',
      observe: 'response'
    };

    return this.http.post<any>(`${environment.apiUrl}/auth/authenticate`, credentials, requestOptions);
  }

  loginStatusChanged = new EventEmitter<boolean>();

  finishAuthentication(token: any, rememberMe: ɵValue<FormControl<boolean | null>> | undefined): void {
    if (rememberMe) {
      sessionStorage.setItem('token', token);
      localStorage.removeItem('token');
      this.loginStatusChanged.emit(true); // Etkinliği tetikleyin
      this.login()

    } else {
      localStorage.setItem('token', token);
      sessionStorage.removeItem('token');
      this.loginStatusChanged.emit(true); // Etkinliği tetikleyin
      this.login()
    }

    this.navigateDefault();
  }

  navigateDefault(): void {
    this.router.navigate(['/main']);

  }

  getToken(): string {
    const tokenInLocalStorage: string | null = localStorage.getItem('token');
    const tokenInSessionStorage: string | null = sessionStorage.getItem('token');
    return (tokenInLocalStorage || tokenInSessionStorage) || '';
  }


  getParsedToken(): any {
    const token = this.getToken();
    if (token) {
      const tokenObj = this.jwtHelper.decodeToken(token);
      return tokenObj;
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return (token != null && !this.jwtHelper.isTokenExpired(token));
  }

  hasAnyPermission(authorities: string[] | string): boolean {
    if (!this.isAuthenticated()) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return this.getPermissions().some((authority: string) => authorities.includes(authority));
  }

  getPermissions(): string[] {
    const tokenObj = this.getParsedToken();
    if (tokenObj && tokenObj.auth) {
      const authArr = tokenObj.auth.split(',');
      return authArr;
    }
    return [];
  }

  isLoggedIn() {
    return this.isAuthenticated2;
  }

  login() {
    this.isAuthenticated2 = true;
    localStorage.setItem(AUTH_KEY, 'true');

  }

  logout(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.isAuthenticated2 = false;
    localStorage.removeItem(AUTH_KEY);
  }


}
