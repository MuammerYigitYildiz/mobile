import {Component, ViewChild, ElementRef, EventEmitter, Output, Input, SimpleChanges} from '@angular/core';
import {MapService} from './map.service';

declare var google: any;

@Component({
  selector: 'app-map',
  template: '<div #map></div>',
  styles: ['div { height: 400px; }']
})
export class MapComponent {

  @ViewChild('map', {static: true}) mapElement!: ElementRef;
  @Input() currentLocationInfo = {il: '', ilce: ''};

  @Output() selectedEnlemChange = new EventEmitter<any>();
  @Input() selectedEnlem: any;

  @Output() selectedBoylamChange = new EventEmitter<any>();
  @Input() selectedBoylam: any;

  @Output() selectedIlChange = new EventEmitter<any>();
  @Input() selectedIl: any;

  @Output() selectedIlceChange = new EventEmitter<any>();
  @Input() selectedIlce: any;

  @Output() selectedAdresChange = new EventEmitter<any>();
  @Input() selectedAdres: any;

  @Output() selectedMahalleChange = new EventEmitter<any>();
  @Input() selectedMahalle: any;



  iller : any[] = [];
  map: any;
  userLocationMarker: any;
  selectedLocationMarker: any;

  constructor(
    private mapService: MapService,
  ) {
  }

  ngOnInit() {
    this.initMap();
    this.mapService.findAllIller().subscribe((response => {
      this.iller = response;
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['selectedEnlem'] || changes['selectedBoylam']) && this.map) {
      this.previusLocationUpdate();
    }

    if (changes['currentLocationInfo'] && changes['currentLocationInfo'].currentValue) {
      console.log('Yeni currentLocationInfo değeri:', this.currentLocationInfo);
    }
  }

  initMap() {
    // Kullanıcı konumu işaretçisi ayarları\
    this.userLocationMarker = new google.maps.Marker({
      map: null, // İlk başta haritada gösterilmez
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#4285F4',
        fillOpacity: 1,
        strokeColor: 'white',
        strokeWeight: 3
      }
    });

    // Harita başlangıç ayarları
    const mapOptions = {
      center: {lat: 39.9334, lng: 32.8597},
      zoom: 10
    };

    // Harita oluşturma
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // Konum işaretçisini haritaya ekleme
    this.userLocationMarker.setMap(this.map);

    // Burada kullanıcının konumu belirlenip mavi renkte işaretleniyor
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Anlık Konum Bilgileri:', position);
          const kullaniciKonumu = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          // Kullanıcı konumunu güncelleme
          this.userLocationMarker.setPosition(kullaniciKonumu);

          // Kullanıcı konumu üzerine odaklanma
          this.map.setCenter(kullaniciKonumu);
          this.map.setZoom(13);

          console.log('Gerçek Zamanlı Enlem:', position.coords.latitude, 'Boylam:', position.coords.longitude);
        },
        (hata) => {
          console.error('Gerçek zamanlı konum alınamadı:', hata);
        }
      );
    } else {
      console.error('Bu tarayıcı tarafından coğrafi konum desteklenmiyor.');
    }

    google.maps.event.addListener(this.map, 'click', (event: any) => {
      // İşaretçi varsa öncekini kaldırma
      if (this.selectedLocationMarker) {
        this.selectedLocationMarker.setMap(null);
      }

      // Seçilen yere işaretçi ekleme
      this.selectedLocationMarker = new google.maps.Marker({
        position: event.latLng,
        map: this.map,
      });


      // İşaretçi konumunu console'a yazma ve output'a verme
      this.selectedEnlem = event.latLng.lat();
      this.selectedBoylam = event.latLng.lng();

      this.selectedEnlemChange.emit(this.selectedEnlem);
      this.selectedBoylamChange.emit(this.selectedBoylam);

      console.log('Seçilen Yer Enlem:', this.selectedEnlem, 'Boylam:', this.selectedBoylam);

      // Google Haritalar API'yi kullanarak konumu işaretleme
      this.reverseGeocode(this.selectedEnlem, this.selectedBoylam)
        .then((konumBilgisi) => {
          console.log('Kullanıcının Konum Bilgisi:', konumBilgisi);
        })
        .catch((hata) => {
          console.error('Konum bilgisi alınamadı:', hata);
        });

    });
  }

  private previusLocationUpdate() {
    // Eğer bir başlangıç konumu varsa haritayı ona göre güncelleme
    if (this.selectedLocationMarker) {
      // Önceki konumu kaldırma
      this.selectedLocationMarker.setMap(null);
    }

    // Seçili konum varsa haritaya ekleme
    if (this.selectedEnlem && this.selectedBoylam) {
      this.selectedLocationMarker = new google.maps.Marker({
        position: new google.maps.LatLng(this.selectedEnlem, this.selectedBoylam),
        map: this.map
      });

      // Yeni değişiklik yapılırsa onu dinleme
      google.maps.event.addListener(this.map, 'click', (event: any) => {
        // Yeni konumu ekleme ve öncekini kaldırma
        if (this.selectedLocationMarker) {
          this.selectedLocationMarker.setMap(null);
        }

        this.selectedLocationMarker = new google.maps.Marker({
          position: event.latLng,
          map: this.map,
        });

        // İşaretçi konumunu console'a yazma ve output'a verme
        this.selectedEnlem = event.latLng.lat();
        this.selectedBoylam = event.latLng.lng();

        this.selectedEnlemChange.emit(this.selectedEnlem);
        this.selectedBoylamChange.emit(this.selectedBoylam);

        console.log('Seçilen Yer Enlem:', this.selectedEnlem, 'Boylam:', this.selectedBoylam);
      });

      // Haritayı başlangıç konumu üzerine odakla
      this.map.setCenter(this.selectedLocationMarker.getPosition());
      this.map.setZoom(15);

      // Google Haritalar API'yi kullanarak konumu işaretleme
      this.reverseGeocode(this.selectedEnlem, this.selectedBoylam)
        .then((konumBilgisi) => {
          console.log('Kullanıcının Konum Bilgisi:', konumBilgisi);
        })
        .catch((hata) => {
          console.error('Konum bilgisi alınamadı:', hata);
        });

    }
  }

  private reverseGeocode(latitude: number, longitude: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      const location = new google.maps.LatLng(latitude, longitude);

      geocoder.geocode({'location': location}, (results: any[], status: any) => {
        if (status === 'OK') {
          if (results[0]) {
            const addressComponents = results[0].address_components;

            // İl ve İlçe bilgilerini bulmaa
            let il, ilce, mahalle, adres;

            for (const component of addressComponents) {
              if (component.types.includes('administrative_area_level_1')) {
                il = component.long_name;
              } else if (component.types.includes('administrative_area_level_2')) {
                ilce = component.long_name;
              } else if (component.types.includes('administrative_area_level_4')) {
                mahalle = component.long_name;
              } else if (component.types.includes('route')) {
                adres = component.long_name;
              }
            }

            const formattedAddress = results[0].formatted_address;
            const currentLocation = { il: il, ilce: ilce, mahalle: mahalle, adres: adres };
            this.currentLocationInfo = currentLocation;
            this.selectedIl = il;
            this.selectedIlce = ilce;
            this.selectedMahalle = mahalle;
            this.selectedAdres = formattedAddress;


            if (this.selectedIl && this.selectedIlce) {
              const convertIl = this.iller.find(il => il.adi === this.selectedIl);
              this.selectedIl = convertIl;
              this.selectedIlceChange.emit(this.selectedIlce);
              this.selectedIlChange.emit(this.selectedIl);
              this.selectedMahalleChange.emit(this.selectedMahalle);
              this.selectedAdresChange.emit(this.selectedAdres);
            }
            resolve({
              formattedAddress: formattedAddress,
              il: il,
              ilce: ilce
            });
          } else {
            reject('Adres bulunamadı.');
          }
        } else {
          reject('Jeokodlama hatası: ' + status);
        }
      });
    });
  }
}
