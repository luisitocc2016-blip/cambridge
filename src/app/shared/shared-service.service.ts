import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
alumnos: any = [];
  constructor() { }

  setAlumnos(data: any) {
    this.alumnos.push(data);
  }

  getAlumnos() {
    return this.alumnos;
  }
}
