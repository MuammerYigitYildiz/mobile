import { Component, OnInit } from '@angular/core';
import {AccountService} from "./account.services";
import {AuthenticationService} from "../util/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NavController, ToastController} from "@ionic/angular";


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  userInfo: any;
  hasGonullu:any;

  formData = {
    adi: '',
    soyadi: '',
    tcKimlik: '',
    dogumYili: '',
    email: '',
    il: null,
    ilce: null,
    uuid: '',
    aciklama: null,
  };

  constructor(private accountService: AccountService,
              private toastController: ToastController,
              public router: Router,
              private navCtrl: NavController,
              private authService: AuthenticationService,
              route:ActivatedRoute) {
    route.params.subscribe(val => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.loadUserInfo();



  }
  loadGonullu() {
    const email = this.userInfo?.email;
    if (email) {
      const apiUrl = `http://localhost:8090/api/gonullu/findByEmail?email=${email}`;

      this.accountService.getGonulluByEmail(apiUrl).subscribe(
        (data) => {
        /*  this.presentToast('Gmail ile eslesen gonullu bulundu', true);*/
          this.hasGonullu= true;
          this.formData=data;
          console.log('Gönüllü bilgisi:', data);
        },
        (error) => {
          this.hasGonullu=false;
          this.presentToast('gamil ile eslesen gonullu bulunamadi, lutfen bir gonullu olsutrunuz', false);
        }
      );
    }
  }
  goToEdit(uuid: string){

    this.navCtrl.navigateForward(['/gonullu-edit', {uuid}]);

  }

  goToTanimlama(uuid: string){

    this.navCtrl.navigateForward(['/tanimlama', {uuid}]);

  }
  goToCreate(){
    this.router.navigateByUrl('/gonullu-create');

  }


  loadUserInfo() {
    this.accountService.getUserInfo().subscribe(
      (data) => {
        this.userInfo = data;
        this.loadGonullu();
      },
      (error) => {
        console.error('API hatası:', error);
      }
    );
  }
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

}
