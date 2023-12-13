import {Component, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../util/authentication.service';
import {ReCaptchaV3Service} from 'ng-recaptcha';

import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Login} from './log';
import {ToastController} from '@ionic/angular';


@Component({
  selector: 'page-login',
  templateUrl: 'login.page.html',
  styleUrls: ['./login.page.scss'],
  encapsulation: ViewEncapsulation.None,
})



export class LoginPage implements OnInit {

  dontHaveAccountText: string = '';
  dontHaveAccountHtml: SafeHtml;
  credentials: Login = new Login();
  form = new FormGroup({
    email: new FormControl(this.credentials.email, [Validators.required]),
    password: new FormControl(this.credentials.password, [Validators.required]),
    rememberMe: new FormControl(!!this.credentials.rememberMe, [])
  });


  constructor(
    public router: Router,
    sanitizer: DomSanitizer,
    private toastController: ToastController,
    private authenticationService: AuthenticationService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private renderer: Renderer2
  ) {
    this.dontHaveAccountHtml = sanitizer.bypassSecurityTrustHtml(this.dontHaveAccountText);
  }

  ngOnInit(): void {
    if (this.authenticationService.isAuthenticated()) {
      this.authenticationService.navigateDefault();
      return;
    }
    this.renderer.addClass(document.body, 'recaptcha');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'recaptcha');
  }

  get f() {
    return this.form.controls;
  }


  login() {
    this.recaptchaV3Service.execute('importantAction').subscribe({
      next: (token) => {
        this.authenticationService.authenticate(this.form.value, token).subscribe({
          next: (response: any) => {
            if (response.headers.get('Authorization')) {
             /* this.presentToast('Giris basarili', true);*/
              this.authenticationService.finishAuthentication(response.headers.get('Authorization'), this.form.value.rememberMe);
              this.router.navigateByUrl('/app/tabs/gonullu');
            } else {
              console.log('Giriş başarısız. Lütfen kimlik bilgilerinizi kontrol edin.');
             /* this.presentToast('giris basarisiz, bilgilerinizi kontrol ediniz lutfen', false);*/
            }
          },
          error: (error: any) => {
            console.error('Giriş sırasında hata oluştu:', error);
            /*this.presentToast('Giris sirasinda bir hata olustu, lutfen sonra tekrar deneyiniz', false);*/
          },
        });
      },
    });
  }

/*
  async presentToast(message: string, success: boolean) {
    const color = success ? 'success' : 'danger';
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: color,
    });
    toast.present();
  }
*/


}

