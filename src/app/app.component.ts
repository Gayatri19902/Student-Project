import { Component } from '@angular/core';
import {NbIconLibraries} from "@nebular/theme";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'synycspro';
  constructor(private iconLib: NbIconLibraries){
    this.iconLib.registerFontPack('fa', {packClass: 'fa', iconClassPrefix: 'fa'})
  }

}
