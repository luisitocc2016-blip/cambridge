import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  alumnos: any = [];
  users: any = [];
  carpool: any = [];
  personasAutorizadas: any = [];
  constructor() { }


  setPersonaAutorizada(data: any) {
    this.personasAutorizadas.push(data);
    localStorage.setItem('personaAutorizada', JSON.stringify(data));
  }

  getPersonaAutorizada() {
    const personaAutorizada = localStorage.getItem('personaAutorizada');
    return personaAutorizada ? JSON.parse(personaAutorizada) : null;
  }

  clearPersonaAutorizada() {
    this.personasAutorizadas = [];
    localStorage.removeItem('personaAutorizada');
  }

  setCarPool(data: any) {
    this.carpool.push(data);
    localStorage.setItem('carPool', JSON.stringify(data));
  }

  getCarPool() {
    const carPool = localStorage.getItem('carPool');
    return carPool ? JSON.parse(carPool) : null;
  }

  clearCarPool() {
    this.carpool = [];
    localStorage.removeItem('carPool');
  }

  setAlumnos(data: any) {
    this.alumnos.push(data);
    localStorage.setItem('alumnos', JSON.stringify(data));
  }


  getAlumnos() {
    const alumnos = localStorage.getItem('alumnos');
    return alumnos ? JSON.parse(alumnos) : null;
  }

  clearAlumnos() {
    this.alumnos = [];
    localStorage.removeItem('alumnos');
  }

  setUser(data: any) {
    this.users.push(data);
    localStorage.setItem('user', JSON.stringify(data));
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  clearUser() {
    this.users = []
    localStorage.removeItem('user');
  }
}
