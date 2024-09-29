// import { Component } from '@angular/core';
// import {NgClass} from "@angular/common";
// import {RouterLink} from "@angular/router";
//
// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [
//     NgClass,
//     RouterLink
//   ],
//   templateUrl: './header.component.html',
//   styleUrl: './header.component.css'
// })
// export class HeaderComponent {
//   menuActive: boolean = false;
//   isMenuOpen: any;
//
//   toggleMenu() {
//     this.menuActive = !this.menuActive;
//   }
// }

import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuActive: boolean = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }
}
