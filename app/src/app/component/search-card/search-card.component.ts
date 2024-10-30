import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-search-card',
  standalone: true,
  imports: [],
  templateUrl: './search-card.component.html',
  styleUrl: './search-card.component.css'
})
export class SearchCardComponent {
  @Input() jobTitle: string = '';
  @Input() companyName: string = '';
  @Input() rating: string = '';
  @Input() postTime: string = '';
  @Input() jobDescription: string = '';
  @Input() jobLocation: string = '';
  @Input() jobType: string = '';
}
