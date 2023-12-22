import { Component } from '@angular/core';
import {AuthenticationService} from "./util/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthenticationService,
              public router: Router,) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  goToAccount(){
    this.router.navigateByUrl('/account');

  }



}
