import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared/shared-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  titulo!: string;
  hideMenu: boolean = false;
  users: any;

  constructor(private router: Router, public service: SharedServiceService) {
    if (this.router.url.includes('/teacher')) {
      this.titulo = 'Class Room';
    } else if (this.router.url.includes('/perfil-alumno')) {
      this.titulo = 'Perfil Alumno';
    } else if (this.router.url.includes('/scanner')) {
      this.titulo = 'Scanner';
    } else if (this.router.url.includes('/administracion')) {
      this.titulo = 'Administracion';
    } else if (this.router.url.includes('/padres')) {
      this.users = this.service.getUser();
      if (this.users && this.users.grupo === 'padres') {
        this.titulo = this.users.nombre;
      } else {
        this.titulo = 'Perfil Padres';
      }
    } else if (this.router.url.includes('/login')) {
      this.hideMenu = true;
      this.titulo = 'Login';
    }
  }

  home(): void {
    this.titulo = '';
    this.router.navigate(['/home']);
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
  abrirScanner(): void {
     this.titulo = 'Scanner';
    this.router.navigate(['/scanner']);
  }
}
