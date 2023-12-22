import {Component, Input, Output, EventEmitter, OnInit, OnChanges} from '@angular/core';
import {IlService} from './il.service';

@Component({
  selector: 'app-il',
  templateUrl: './il.component.html',
  styleUrls: ['./il.component.scss']
})
export class IlComponent implements OnInit {
  iller = [];
  @Output() selectedIlChange = new EventEmitter<any>();
  @Input() selectedIl: any;

  constructor(
    private ilService: IlService,
  ) {
  }

  compareWith(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  onIlSelectionChange(event: any) {
    this.selectedIl = event.detail.value;
    this.selectedIlChange.emit(this.selectedIl);
  }

  ngOnInit() {
    this.ilService.findAllIller().subscribe((response => {
      this.iller = response;
    }));

  }

}
