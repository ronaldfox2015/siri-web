import { Component } from '@angular/core';
import {SearchCardComponent} from "../../component/search-card/search-card.component";
import {Job} from "../../service/interface/job";
import {NgForOf} from "@angular/common";
import {SearchFilterComponent} from "../../component/search-filter/search-filter.component";
import {NgxPaginationModule} from "ngx-pagination";
import {Router} from "@angular/router";

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [
    SearchCardComponent,
    NgForOf,
    SearchFilterComponent,
    NgxPaginationModule
  ],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent {
  page = 2; // Página inicial

  jobs: Job[] = [
    {
      title: 'LOGISTICA COMERCIAL',
      companyName: 'GOURMET 117',
      rating: '1.9',
      postTime: 'Publicado hoy',
      description: 'LOGÍSTICA COMPRAS: Importante empresa importadora de licores y productos gourmet está en la búsqueda de una persona encargada de la logística comercial (Planner), con conocimiento...',
      location: 'Chorrillos, Lima',
      type: 'Presencial'
    },
    {
      title: 'DESARROLLADOR FRONTEND',
      companyName: 'TECNOLOGIA XYZ',
      rating: '4.5',
      postTime: 'Publicado ayer',
      description: 'Se busca desarrollador frontend con experiencia en Angular y TypeScript.',
      location: 'Miraflores, Lima',
      type: 'Remoto'
    },
    {
      title: 'LOGISTICA COMERCIAL',
      companyName: 'GOURMET 117',
      rating: '1.9',
      postTime: 'Publicado hoy',
      description: 'LOGÍSTICA COMPRAS: Importante empresa importadora de licores y productos gourmet está en la búsqueda de una persona encargada de la logística comercial (Planner), con conocimiento...',
      location: 'Chorrillos, Lima',
      type: 'Presencial'
    },
    {
      title: 'DESARROLLADOR FRONTEND',
      companyName: 'TECNOLOGIA XYZ',
      rating: '4.5',
      postTime: 'Publicado ayer',
      description: 'Se busca desarrollador frontend con experiencia en Angular y TypeScript.',
      location: 'Miraflores, Lima',
      type: 'Remoto'
    },
    {
      title: 'LOGISTICA COMERCIAL',
      companyName: 'GOURMET 117',
      rating: '1.9',
      postTime: 'Publicado hoy',
      description: 'LOGÍSTICA COMPRAS: Importante empresa importadora de licores y productos gourmet está en la búsqueda de una persona encargada de la logística comercial (Planner), con conocimiento...',
      location: 'Chorrillos, Lima',
      type: 'Presencial'
    },
    {
      title: 'DESARROLLADOR FRONTEND',
      companyName: 'TECNOLOGIA XYZ',
      rating: '4.5',
      postTime: 'Publicado ayer',
      description: 'Se busca desarrollador frontend con experiencia en Angular y TypeScript.',
      location: 'Miraflores, Lima',
      type: 'Remoto'
    },
    {
      title: 'LOGISTICA COMERCIAL',
      companyName: 'GOURMET 117',
      rating: '1.9',
      postTime: 'Publicado hoy',
      description: 'LOGÍSTICA COMPRAS: Importante empresa importadora de licores y productos gourmet está en la búsqueda de una persona encargada de la logística comercial (Planner), con conocimiento...',
      location: 'Chorrillos, Lima',
      type: 'Presencial'
    },
    {
      title: 'DESARROLLADOR FRONTEND',
      companyName: 'TECNOLOGIA XYZ',
      rating: '4.5',
      postTime: 'Publicado ayer',
      description: 'Se busca desarrollador frontend con experiencia en Angular y TypeScript.',
      location: 'Miraflores, Lima',
      type: 'Remoto'
    },
    {
      title: 'LOGISTICA COMERCIAL',
      companyName: 'GOURMET 117',
      rating: '1.9',
      postTime: 'Publicado hoy',
      description: 'LOGÍSTICA COMPRAS: Importante empresa importadora de licores y productos gourmet está en la búsqueda de una persona encargada de la logística comercial (Planner), con conocimiento...',
      location: 'Chorrillos, Lima',
      type: 'Presencial'
    },
    {
      title: 'DESARROLLADOR FRONTEND',
      companyName: 'TECNOLOGIA XYZ',
      rating: '4.5',
      postTime: 'Publicado ayer',
      description: 'Se busca desarrollador frontend con experiencia en Angular y TypeScript.',
      location: 'Miraflores, Lima',
      type: 'Remoto'
    },
    {
      title: 'LOGISTICA COMERCIAL',
      companyName: 'GOURMET 117',
      rating: '1.9',
      postTime: 'Publicado hoy',
      description: 'LOGÍSTICA COMPRAS: Importante empresa importadora de licores y productos gourmet está en la búsqueda de una persona encargada de la logística comercial (Planner), con conocimiento...',
      location: 'Chorrillos, Lima',
      type: 'Presencial'
    },
    {
      title: 'DESARROLLADOR FRONTEND',
      companyName: 'TECNOLOGIA XYZ',
      rating: '4.5',
      postTime: 'Publicado ayer',
      description: 'Se busca desarrollador frontend con experiencia en Angular y TypeScript.',
      location: 'Miraflores, Lima',
      type: 'Remoto'
    },
    {
      title: 'LOGISTICA COMERCIAL',
      companyName: 'GOURMET 117',
      rating: '1.9',
      postTime: 'Publicado hoy',
      description: 'LOGÍSTICA COMPRAS: Importante empresa importadora de licores y productos gourmet está en la búsqueda de una persona encargada de la logística comercial (Planner), con conocimiento...',
      location: 'Chorrillos, Lima',
      type: 'Presencial'
    },
    {
      title: 'DESARROLLADOR FRONTEND',
      companyName: 'TECNOLOGIA XYZ',
      rating: '4.5',
      postTime: 'Publicado ayer',
      description: 'Se busca desarrollador frontend con experiencia en Angular y TypeScript.',
      location: 'Miraflores, Lima',
      type: 'Remoto'
    },
    {
      title: 'LOGISTICA COMERCIAL',
      companyName: 'GOURMET 117',
      rating: '1.9',
      postTime: 'Publicado hoy',
      description: 'LOGÍSTICA COMPRAS: Importante empresa importadora de licores y productos gourmet está en la búsqueda de una persona encargada de la logística comercial (Planner), con conocimiento...',
      location: 'Chorrillos, Lima',
      type: 'Presencial'
    },
    {
      title: 'DESARROLLADOR FRONTEND',
      companyName: 'TECNOLOGIA XYZ',
      rating: '4.5',
      postTime: 'Publicado ayer',
      description: 'Se busca desarrollador frontend con experiencia en Angular y TypeScript.',
      location: 'Miraflores, Lima',
      type: 'Remoto'
    },
    {
      title: 'LOGISTICA COMERCIAL',
      companyName: 'GOURMET 117',
      rating: '1.9',
      postTime: 'Publicado hoy',
      description: 'LOGÍSTICA COMPRAS: Importante empresa importadora de licores y productos gourmet está en la búsqueda de una persona encargada de la logística comercial (Planner), con conocimiento...',
      location: 'Chorrillos, Lima',
      type: 'Presencial'
    },
    {
      title: 'DESARROLLADOR FRONTEND',
      companyName: 'TECNOLOGIA XYZ',
      rating: '4.5',
      postTime: 'Publicado ayer',
      description: 'Se busca desarrollador frontend con experiencia en Angular y TypeScript.',
      location: 'Miraflores, Lima',
      type: 'Remoto'
    },
    {
      title: 'LOGISTICA COMERCIAL',
      companyName: 'GOURMET 117',
      rating: '1.9',
      postTime: 'Publicado hoy',
      description: 'LOGÍSTICA COMPRAS: Importante empresa importadora de licores y productos gourmet está en la búsqueda de una persona encargada de la logística comercial (Planner), con conocimiento...',
      location: 'Chorrillos, Lima',
      type: 'Presencial'
    },
    {
      title: 'DESARROLLADOR FRONTEND',
      companyName: 'TECNOLOGIA XYZ',
      rating: '4.5',
      postTime: 'Publicado ayer',
      description: 'Se busca desarrollador frontend con experiencia en Angular y TypeScript.',
      location: 'Miraflores, Lima',
      type: 'Remoto'
    },
    {
      title: 'LOGISTICA COMERCIAL',
      companyName: 'GOURMET 117',
      rating: '1.9',
      postTime: 'Publicado hoy',
      description: 'LOGÍSTICA COMPRAS: Importante empresa importadora de licores y productos gourmet está en la búsqueda de una persona encargada de la logística comercial (Planner), con conocimiento...',
      location: 'Chorrillos, Lima',
      type: 'Presencial'
    },
    {
      title: 'DESARROLLADOR FRONTEND',
      companyName: 'TECNOLOGIA XYZ',
      rating: '4.5',
      postTime: 'Publicado ayer',
      description: 'Se busca desarrollador frontend con experiencia en Angular y TypeScript.',
      location: 'Miraflores, Lima',
      type: 'Remoto'
    },
    {
      title: 'LOGISTICA COMERCIAL',
      companyName: 'GOURMET 117',
      rating: '1.9',
      postTime: 'Publicado hoy',
      description: 'LOGÍSTICA COMPRAS: Importante empresa importadora de licores y productos gourmet está en la búsqueda de una persona encargada de la logística comercial (Planner), con conocimiento...',
      location: 'Chorrillos, Lima',
      type: 'Presencial'
    },
    {
      title: 'DESARROLLADOR FRONTEND',
      companyName: 'TECNOLOGIA XYZ',
      rating: '4.5',
      postTime: 'Publicado ayer',
      description: 'Se busca desarrollador frontend con experiencia en Angular y TypeScript.',
      location: 'Miraflores, Lima',
      type: 'Remoto'
    },
    {
      title: 'LOGISTICA COMERCIAL',
      companyName: 'GOURMET 117',
      rating: '1.9',
      postTime: 'Publicado hoy',
      description: 'LOGÍSTICA COMPRAS: Importante empresa importadora de licores y productos gourmet está en la búsqueda de una persona encargada de la logística comercial (Planner), con conocimiento...',
      location: 'Chorrillos, Lima',
      type: 'Presencial'
    },
    {
      title: 'DESARROLLADOR FRONTEND',
      companyName: 'TECNOLOGIA XYZ',
      rating: '4.5',
      postTime: 'Publicado ayer',
      description: 'Se busca desarrollador frontend con experiencia en Angular y TypeScript.',
      location: 'Miraflores, Lima',
      type: 'Remoto'
    },
    {
      title: 'LOGISTICA COMERCIAL',
      companyName: 'GOURMET 117',
      rating: '1.9',
      postTime: 'Publicado hoy',
      description: 'LOGÍSTICA COMPRAS: Importante empresa importadora de licores y productos gourmet está en la búsqueda de una persona encargada de la logística comercial (Planner), con conocimiento...',
      location: 'Chorrillos, Lima',
      type: 'Presencial'
    },
    {
      title: 'DESARROLLADOR FRONTEND',
      companyName: 'TECNOLOGIA XYZ',
      rating: '4.5',
      postTime: 'Publicado ayer',
      description: 'Se busca desarrollador frontend con experiencia en Angular y TypeScript.',
      location: 'Miraflores, Lima',
      type: 'Remoto'
    },
  ];
  jobsPerPage = 2;
  currentPage = 1;
  currentUrl: string;
  constructor(private router: Router) {
    this.currentUrl = this.router.url;

  }
  get paginatedJobs() {
    const startIndex = (this.currentPage - 1) * this.jobsPerPage;
    return this.jobs.slice(startIndex, startIndex + this.jobsPerPage);
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.router.navigate([`/buscar?page${pageNumber}`]);  // Redirigir desde el padre

  }

}
