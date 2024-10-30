import {Component, Input} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-selectable-card',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './selectable-card.component.html',
  styleUrl: './selectable-card.component.css'
})
export class SelectableCardComponent {
  @Input() title: string = ''
  selectedCategory: number = -1; // Ninguna seleccionada por defecto
  @Input()  i : number = 0;
  selectCategory(index: number) {
    this.selectedCategory = index;
  }
}
