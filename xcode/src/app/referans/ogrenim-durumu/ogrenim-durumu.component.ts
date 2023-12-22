import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OgrenimDurumuService} from "./ogrenim-durumu.service";

@Component({
  selector: 'app-ogrenim-durumu',
  templateUrl: './ogrenim-durumu.component.html',
  styleUrls: ['./ogrenim-durumu.component.scss'],
})
export class OgrenimDurumuComponent  implements OnInit {

  ogrenimDurumlari = [];
  @Output() selectedOgrenimDurumuChange = new EventEmitter<any>();
  @Input() selectedOgrenimDurumu: any;

  constructor(
    private ogrenimDurumuService: OgrenimDurumuService,
  ) {
  }

  compareWith(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  onOgrenimDurumuSelectionChange(event: any) {
    this.selectedOgrenimDurumu = event.detail.value;
    this.selectedOgrenimDurumuChange.emit(this.selectedOgrenimDurumu);
  }

  ngOnInit() {
    this.ogrenimDurumuService.findAllOgrenimDurumlari().subscribe((response => {
      this.ogrenimDurumlari = response;
    }));

  }

}
