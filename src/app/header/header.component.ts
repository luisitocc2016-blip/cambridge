import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared/shared-service.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CarPoolDialog } from '../view-padres/view-padres.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('menu') menu: any;
  @ViewChild('notificationsMenu') notificationsMenu: any;
  titulo!: string;
  hideMenu: boolean = false;
  users: any;
  alumnos: any = [];
  notifications: any[] = [];
  carpool: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private router: Router, public service: SharedServiceService, public dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.service.enviarNotificacion.subscribe((data) => {
      if (data) {
        const carpool = this.service.getCarPool();
        if (carpool) {
          this.carpool.push(carpool);
          this.notifications = this.carpool.filter((c: any) => c.status === 'pendiente');
        }
      }
    });
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
    const carpool = this.service.getCarPool();
    if (carpool) {
      this.carpool.push(carpool);
      this.notifications = this.carpool.filter((c: any) => c.status === 'pendiente');
    }
    const alumnos = this.service.getAlumnos();
    if (alumnos) {
      this.alumnos.push(alumnos);
    }
  }

  verNotification(notification: any): void {
    const findAlumno = this.alumnos.filter((alumno: any) => alumno.nombre === notification.alumnoSeleccionado);
    if (findAlumno.length > 0) {
      notification.alumno = [findAlumno[0]];
    }
    const dialogRef = this.dialog.open(CarPoolDialog, {
      data: {
        action: 'aprobar',
        data: notification
      },
      width: '27%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.status === 'aprobado') {
          result.mensaje = 'Autorizado';
          this.service.carpoolNotificado.next(true);
        } else {
          result.mensaje = 'declinado';
        }
        result.alumno = [];
        this.notifications.splice(this.notifications.indexOf(notification), 1);
        this.carpool.splice(this.carpool.indexOf(result), 1);
        this.service.setCarPool(result);
        const carPool = this.service.getCarPool();
        this.carpool = [];
        this.carpool.push(carPool);
        this._snackBar.open(`${result.quienEnvia} ha sido ${result.mensaje}`, 'Cerrar', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        if (result.status === 'aprobado') {
          this.service.carpoolNotificado.next(true);
        } else {
          this.service.carpoolNotificado.next(false);
        }

      }
    });
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
