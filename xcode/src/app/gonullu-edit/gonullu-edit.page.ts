import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ToastController} from "@ionic/angular";
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-gonullu-edit',
  templateUrl: './gonullu-edit.page.html',
  styleUrls: ['./gonullu-edit.page.scss'],
})
export class GonulluEditPage implements OnInit {
  formData = {
    adi: '',
    soyadi: '',
    tcKimlik: '',
    dogumYili: '',
    kimlikTeslimTarihi:'',
    email: '',
    meslek:'',
    babaAdi:'',
    stk:'',
    ayakkabiNo:'',
    aciklama:'',
    ilce:'',
    mahalle:'',
    adres:'',
    il: null,
    beden: null,
    cinsiyet:null,
    ogrenimDurumu:null,
    kanGrubu:null,
    uuid: null,
    enlem:null,
    boylam:null,

  };
  ayakkabiNumaralari: number[] = [];

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private toastController: ToastController,
  ) {
    this.populateAyakkabiNumaralari();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const uuid = params['uuid'];
      const apiUrl = `${environment.apiUrl}/gonullu/${uuid}`;
      this.http.get(apiUrl).subscribe((data: any) => {
        this.formData = data;

      });
    });

  }
  populateAyakkabiNumaralari() {
    for (let i = 30; i <= 50; i++) {
      this.ayakkabiNumaralari.push(i);
    }
  }
  formatDateForApi(date: Date): string {
    return formatDate(date, 'yyyy-MM-ddTHH:ssZ', 'en-US');
  }
  sendFormData() {
    if (this.formData.dogumYili !== null) {
      const idObject= new Date(this.formData.kimlikTeslimTarihi)
      const dateObject = new Date(this.formData.dogumYili);
      const formatedDate = this.formatDateForApi(dateObject);
      const idDate= this.formatDateForApi(idObject);
      this.formData.kimlikTeslimTarihi=idDate;
      this.formData.dogumYili = formatedDate;
    }
    const apiUrl = `${environment.apiUrl}/gonullu/${this.formData.uuid}`;
    this.http.put(apiUrl, this.formData).subscribe(() => {
      this.presentToast('Gonullu basarili bir sekilde guncellendi.', true);
      console.log('Güncelleme işlemi başarılı!');
    });
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
