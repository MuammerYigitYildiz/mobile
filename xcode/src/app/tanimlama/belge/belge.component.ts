import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BedenService} from "../../referans/beden/beden.service";
import {BelgeService} from "./belge.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-belge',
  templateUrl: './belge.component.html',
  styleUrls: ['./belge.component.scss'],
})
export class BelgeComponent  implements OnInit {


  constructor(private belgeService : BelgeService,) {
  }

  ngOnInit(){}



}
