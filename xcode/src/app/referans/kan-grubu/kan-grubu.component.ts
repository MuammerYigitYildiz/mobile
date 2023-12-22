import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {KanGrubuService} from "./kan-grubu.service";


@Component({
  selector: 'app-kan-grubu',
  templateUrl: './kan-grubu.component.html',
  styleUrls: ['./kan-grubu.component.scss'],
})
export class KanGrubuComponent  implements OnInit {
  kanGruplari = [];
  @Output() selectedKanGrubuChange = new EventEmitter<any>();
  @Input() selectedKanGrubu: any;

  constructor(
    private kanGrubuService: KanGrubuService
  ) {
  }

  compareWith(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  onKanGrubuSelectionChange(event: any) {
    this.selectedKanGrubu = event.detail.value;
    this.selectedKanGrubuChange.emit(this.selectedKanGrubu);
  }

  ngOnInit() {
    this.kanGrubuService.findAllKanGruplari().subscribe((response => {
      this.kanGruplari = response;
    }));

  }
}
