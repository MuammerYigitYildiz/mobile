import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastController} from "@ionic/angular";
import {BelgeService} from "./belge/belge.service";
import {EgitimService} from "./egitim/egitim.service";
import {EkipmanService} from "./ekipman/ekipman.service";
import {KkdService} from "./kkd/kkd.service";
import {TatbikatService} from "./tatbikat/tatbikat.service";
import {UzmanlikService} from "./uzmanlik/uzmanlik.service";
import {YanginService} from "./yangin/yangin.service";
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-tanimlama',
  templateUrl: './tanimlama.page.html',
  styleUrls: ['./tanimlama.page.scss'],
})
export class TanimlamaPage implements OnInit {
  formData = {
    adi: '',
    soyadi: '',
    tcKimlik: '',
    dogumYili: '',
    kimlikTeslimTarihi: '',
    email: '',
    meslek: '',
    babaAdi: '',
    stk: '',
    ayakkabiNo: '',
    aciklama: '',
    ilce: '',
    mahalle: '',
    adres: '',
    il: null,
    beden: null,
    cinsiyet: null,
    ogrenimDurumu: null,
    kanGrubu: null,
    uuid: null,

  };
  belgeler: any[] = [];
  egitimler: any[] = [];
  ekipmanlar: any[] = [];
  kkdler: any[] = [];
  tatbikatlar: any[] = [];
  uzmanliklar: any[] = [];
  yanginlar: any[] = [];



  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private belgeService: BelgeService,
              private egitimService: EgitimService,
              private ekipmanService: EkipmanService,
              private kkdService: KkdService,
              private tatbikatService: TatbikatService,
              private uzmanlikService: UzmanlikService,
              private yanginService: YanginService,
              private datePipe: DatePipe,
              private toastController: ToastController,
  ) {
  }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      const uuid = params['uuid'];
      const apiUrl = `${environment.apiUrl}/gonullu/${uuid}`;
      this.http.get(apiUrl).subscribe((data: any) => {
        this.formData = data;
        this.loadGonulluBelge();
        this.loadGonulluEgitim();
        this.loadGonulluEkipman();
        this.loadGonulluKkd();
        this.loadGonulluTatbikat();
        this.loadGonulluUzmanlik();
        this.loadGonulluYangin();

      });
    });
  }



  loadGonulluBelge() {
    const uuid = this.formData.uuid;
    if (uuid) {
      this.belgeService.get(uuid).subscribe(
        (data: any) => {
          this.belgeler = data;
        },
        (error) => {
          console.error('Error fetching belge data:', error);
        }
      );
    }
  }

  formatDate(dateString: string): string {
    const formattedDate = this.datePipe.transform(dateString, 'dd-MM-yyyy');
    return formattedDate || '';
  }


  loadGonulluEgitim() {
    const uuid = this.formData.uuid;
    if (uuid) {
      this.egitimService.get(uuid).subscribe(
        (data: any) => {
          this.egitimler = data;
        },
        (error) => {
          console.error('Error fetching belge data:', error);
        }
      );
    }
  }
  loadGonulluEkipman() {
    const uuid = this.formData.uuid;
    if (uuid) {
      this.ekipmanService.get(uuid).subscribe(
        (data: any) => {
          this.ekipmanlar = data;
        },
        (error) => {
          console.error('Error fetching belge data:', error);
        }
      );
    }
  }

  loadGonulluKkd() {
    const uuid = this.formData.uuid;
    if (uuid) {
      this.kkdService.get(uuid).subscribe(
        (data: any) => {
          this.kkdler = data;
        },
        (error) => {
          console.error('Error fetching belge data:', error);
        }
      );
    }
  }
  loadGonulluTatbikat() {
    const uuid = this.formData.uuid;
    if (uuid) {
      this.tatbikatService.get(uuid).subscribe(
        (data: any) => {
          this.tatbikatlar = data;
        },
        (error) => {
          console.error('Error fetching belge data:', error);
        }
      );
    }
  }
  loadGonulluUzmanlik() {
    const uuid = this.formData.uuid;
    if (uuid) {
      this.uzmanlikService.get(uuid).subscribe(
        (data: any) => {
          this.uzmanliklar = data;
        },
        (error) => {
          console.error('Error fetching belge data:', error);
        }
      );
    }
  }
  loadGonulluYangin() {
    const uuid = this.formData.uuid;
    if (uuid) {
      this.yanginService.get(uuid).subscribe(
        (data: any) => {
          this.yanginlar = data;
        },
        (error) => {
          console.error('Error fetching belge data:', error);
        }
      );
    }
  }


}
