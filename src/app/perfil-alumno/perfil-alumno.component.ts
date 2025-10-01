import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { filter, map, pairwise } from 'rxjs';
import { SharedServiceService } from '../shared/shared-service.service';

@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.css'],
})
export class PerfilAlumnoComponent implements OnInit {
  alumnos: any = this.service.getAlumnos();
  alumno: any;
  previousUrl: string = '';

  constructor(public service:SharedServiceService,public activatedRoute: ActivatedRoute, public router: Router, private location: Location) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.alumno = this.alumnos.filter(
        (item: { id: number }) => item.id === Number(id)
      )[0];
    }
     this.router.events
      .pipe(
        filter((event) => event instanceof RoutesRecognized),
        map((event) => event as RoutesRecognized),
        pairwise()
      )
      .subscribe((events: [RoutesRecognized, RoutesRecognized]) => {
        this.previousUrl = events[0].urlAfterRedirects;
      });
  }
  

  goBack(): void {
    console.log(this.previousUrl);
    
    if (this.previousUrl !== undefined) {
      this.location.back();
    } else {
     // this.router.navigate([HOME_URL], { replaceUrl: true });
    }
  }


  editarHermano(alumno: any) {
    this.router.navigate(['/perfil-alumno', alumno.id]);
    this.alumno = this.alumnos.filter(
      (item: { id: number }) => item.id === alumno.id
    )[0];
  }
}
