import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    titulo!: string;

    constructor(private router: Router) {
      if (this.router.url.includes('/teacher')) {
        this.titulo = 'Class Rooms';
      } else if (this.router.url.includes('/perfil-alumno')) {
        this.titulo = 'Perfil Alumno';
      } else if (this.router.url.includes('/administracion')) {
        this.titulo = 'Administracion de Alumnos';
      } else if (this.router.url.includes('/padres')) {
        this.titulo = 'Perfil Padres';
      }
    }

    teachersClassRoom(): void {
      this.titulo = 'Teacher Rooms';
      this.router.navigate(['/teacher']);
    }

    administracion(): void {
      this.titulo = 'Administracion de Alumnos';
      this.router.navigate(['/administracion']);
    }

    perfilAlumno(): void {
      this.titulo = 'Perfil Alumno';
      this.router.navigate(['/perfil-alumno']);
    }

     padres(): void {
      this.titulo = 'Hijos';
      this.router.navigate(['/padres']);
    }
}
