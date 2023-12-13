import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlbHttpInterceptorService implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const isApiUrl = req.url.startsWith(environment.apiUrl);
    if (this.authenticationService.isAuthenticated() && isApiUrl) {
      req = req.clone({
        setHeaders: {
          Authorization: this.authenticationService.getToken()
        }
      });
    }
    return next.handle(req);
  }
}
