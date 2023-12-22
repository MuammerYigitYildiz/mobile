import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CinsiyetService} from "./cinsiyet.service";

@Component({
  selector: 'app-cinsiyet',
  templateUrl: './cinsiyet.component.html',
  styleUrls: ['./cinsiyet.component.scss'],
})
export class CinsiyetComponent  implements OnInit {

  cinsiyetler = [];
  @Output() selectedCinsiyetChange = new EventEmitter<any>();
  @Input() selectedCinsiyet: any;

  constructor(
    private cinsiyetService: CinsiyetService,
  ) {
  }

  compareWith(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  onCinsiyetSelectionChange(event: any) {
    this.selectedCinsiyet = event.detail.value;
    this.selectedCinsiyetChange.emit(this.selectedCinsiyet);
  }

  ngOnInit() {
    this.cinsiyetService.findAllCinsiyetler().subscribe((response => {
      this.cinsiyetler = response;
    }));

  }

}
