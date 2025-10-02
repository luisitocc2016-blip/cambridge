import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
alumnos: any = [];
users:any = [];
  constructor() { }

  setAlumnos(data: any) {
    this.alumnos.push(data);
  }

  getAlumnos() {
    return this.alumnos;
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
    localStorage.removeItem('user');
  }
}
