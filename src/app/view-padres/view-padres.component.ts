import { AfterViewInit, Component, OnInit } from '@angular/core';
import { alumnos } from '../constants/alumnos';

@Component({
  selector: 'app-view-padres',
  templateUrl: './view-padres.component.html',
  styleUrls: ['./view-padres.component.css']
})
export class ViewPadresComponent implements OnInit, AfterViewInit {
 alumno: any;
  alumnos: any;

  ngOnInit(): void {
    this.alumnos = alumnos;
    console.log(this.alumnos);
    
    this.alumno = alumnos[0];
    }

    ngAfterViewInit(): void {
      this.alumnos.forEach((alumno: any) => {
        const header = document.querySelector(`.example-header-image[data-index="${this.alumnos.indexOf(alumno)}"]`) as HTMLElement;
        if (header) {
          header.style.backgroundImage = `url('${alumno.fotoUrl}')`;
          header.style.backgroundSize = 'cover';
          header.style.backgroundPosition = 'top center';
        }
      });
    }

     agregarPersona() {
    alert("Funcionalidad en desarrollo");
  }
    viewQr() {
      alert("Funcionalidad en desarrollo");
    }

  cargarHermanos(alumno: any) {
    this.alumno = this.alumnos.filter(
      (item: { id: number }) => item.id === alumno.id
    )[0];

  }

}
