import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BedenService} from "./beden.service";

@Component({
  selector: 'app-beden',
  templateUrl: './beden.component.html',
  styleUrls: ['./beden.component.scss'],
})
export class BedenComponent  implements OnInit {
  bedenler = [];
  @Output() selectedBedenChange = new EventEmitter<any>();
  @Input() selectedBeden: any;

  constructor(
    private bedenService: BedenService,
  ) {
  }

  compareWith(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  onBedenSelectionChange(event: any) {
    this.selectedBeden = event.detail.value;
    this.selectedBedenChange.emit(this.selectedBeden);
  }

  ngOnInit() {
    this.bedenService.findAllBedenler().subscribe((response => {
      this.bedenler = response;
    }));

  }
}
