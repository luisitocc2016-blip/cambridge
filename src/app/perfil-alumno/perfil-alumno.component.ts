import { Component, OnInit } from '@angular/core';
import { alumnos } from '../constants/alumnos';

@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.css'],
})
export class PerfilAlumnoComponent implements OnInit {
  alumno: any;
  alumnos: any;

  ngOnInit(): void {
    this.alumnos = alumnos;
    this.alumno = alumnos[0];
  }

  cargarHermanos(alumno: any) {
    this.alumno = this.alumnos.filter(
      (item: { id: number }) => item.id === alumno.id
    )[0];
  }
}
