import { Component } from '@angular/core';
import {CarouselComponent} from "../../component/carousel/carousel.component";
import {JobCardComponent} from "../../component/job-card/job-card.component";
import {NgForOf} from "@angular/common";
import {SelectableCardComponent} from "../../component/selectable-card/selectable-card.component";
import { Router } from '@angular/router';
import {ApplicantService} from "../../service/applicant.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, JobCardComponent, NgForOf, SelectableCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  jobs = [
    {
      title: 'Frontend Developer',
      company: 'Tech Solutions',
      location: 'Madrid, España',
      imageUrl: 'https://via.placeholder.com/300x180'
    },
    {
      title: 'Backend Developer',
      company: 'Innovative Labs',
      location: 'Barcelona, España',
      imageUrl: 'https://via.placeholder.com/300x180'
    },
    {
      title: 'Full Stack Developer',
      company: 'Creative Agency',
      location: 'Valencia, España',
      imageUrl: 'https://via.placeholder.com/300x180'
    }
  ];

  menuItems = [
    { title: 'Informatica', description: 'Description for item 1' },
    { title: 'Marketing y ventas', description: 'Description for item 2' },
    { title: 'finanzas', description: 'Description for item 3' },
    { title: 'Producción', description: 'Description for item 3' }
  ];
  constructor(private router: Router) {}
  manejarRedireccion() {
    this.router.navigate(['/buscar']);  // Redirigir desde el padre
  }
}
