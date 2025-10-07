import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedServiceService } from '../shared/shared-service.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { NewUserDialog } from '../login/login.component';


@Component({
  selector: 'app-view-padres',
  templateUrl: './view-padres.component.html',
  styleUrls: ['./view-padres.component.css']
})
export class ViewPadresComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  alumnos: any = [];
  carpool: any = [];
  users: any = [];

  constructor(private _snackBar: MatSnackBar, private router: Router, public dialog: MatDialog, public service: SharedServiceService) { }

  ngOnInit(): void {
    const users = this.service.getUser();
    if (users) {
      this.users.push(users);
    }
    const alumnos = this.service.getAlumnos();
    if (alumnos) {
      this.alumnos.push(alumnos);
    }
    const carpool = this.service.getCarPool();
    if (carpool) {
      this.carpool.push(carpool);
    }
  }

  agregarUser() {
    const dialogRef = this.dialog.open(NewUserDialog, {
      data: { action: 'nuevo' },
      width: '40%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.setUser(result);
        const users = this.service.getUser();
        this.users.push(users);
        this._snackBar.open(`${result.nombre} ha sido Agregado`, 'Cerrar', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }

  editarUser(user: any) {
    const dialogRef = this.dialog.open(NewUserDialog, {
      data: {
        action: 'edit',
        user
      },
      width: '40%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.users.splice(this.alumnos.indexOf(user), 1);
        this.service.setUser(result);
        const users = this.service.getUser();
        this.users.push(users);
        this._snackBar.open(`${user.nombre} ha sido Actualizado`, 'Cerrar', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }

    });
  }

  borrarUser(user: any) {
    this.users.splice(this.users.indexOf(user), 1);
    this.service.clearUser(); // Clear the user from the service as well
    this._snackBar.open(`${user.nombre} ha sido Eliminado`, 'Cerrar', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }


  selectedTabChange(event: any) {
    const selectedIndex = event.index;
    /*  if (selectedIndex === 1) {
        this.alumnos.forEach((alumno: any) => {
         const header = document.querySelector(`.example-header-image[data-index="${this.alumnos.indexOf(alumno)}"]`) as HTMLElement;
         if (header) {
           header.style.backgroundImage = `url('${alumno.fotoUrl}')`;
           header.style.backgroundSize = 'cover';
           header.style.backgroundPosition = 'top center';
         }
       });
     } */
  }

  agregarAlumno() {
    const dialogRef = this.dialog.open(FamiliaDialog, {
      data: {},
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.setAlumnos(result);
        const alumnos = this.service.getAlumnos();
        this.alumnos.push(alumnos);
        this._snackBar.open(`${result.nombre} ha sido Agregado`, 'Cerrar', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }

  editarAlumno(alumno: any) {
    const dialogRef = this.dialog.open(FamiliaDialog, {
      data: alumno,
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alumnos.splice(this.alumnos.indexOf(alumno), 1);
        this.service.setAlumnos(result);
        const alumnos = this.service.getAlumnos();
        this.alumnos.push(alumnos);
        this._snackBar.open(`${alumno.nombre} ha sido Actualizado`, 'Cerrar', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }

    });
    //this.router.navigate(['/perfil-alumno', alumno.id]);
  }

  borrarAlumno(alumno: any) {
    this.alumnos.splice(this.alumnos.indexOf(alumno), 1);
    this._snackBar.open(`${alumno.nombre} ha sido Eliminado`, 'Cerrar', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  agregarPersona() {
    const dialogRef = this.dialog.open(PersonaAutorizadaDialog, {
      data: {},
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let existe = false;
        this.alumnos.forEach((alumno: any) => {
          if (Array.isArray(alumno.personasAutorizadas) && alumno.personasAutorizadas.length > 0) {
            alumno.personasAutorizadas.forEach((p: any) => {
              if (p.nombre.toUpperCase() === result.nombre.toUpperCase()) {
                existe = true;
              }
            });
          }
        });
        if (!existe) {
          this.alumnos.forEach((alumno: any) => {
            alumno.personasAutorizadas.push(result);
          });
        }
        this._snackBar.open(`${result.nombre} ha sido Agregado`, 'Cerrar', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }

  viewQr() {
    alert("Funcionalidad en desarrollo");
  }

  editarPersona(persona: any) {
    const dialogRef = this.dialog.open(PersonaAutorizadaDialog, {
      data: persona,
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alumnos.forEach((alumno: any) => {
          if (Array.isArray(alumno.personasAutorizadas) && alumno.personasAutorizadas.length > 0) {
            alumno.personasAutorizadas.forEach((p: any) => {
              const index = alumno.personasAutorizadas.indexOf(persona);
              if (index !== -1) {
                alumno.personasAutorizadas.splice(index, 1);
              }
              this.alumnos.forEach((alumno: any) => {
                alumno.personasAutorizadas.push(result);
              });
            });
          }
        });
        this._snackBar.open(`${result.nombre} ha sido Actualizado`, 'Cerrar', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }

  borrarPersona(persona: any) {
    this.alumnos.forEach((alumno: any) => {
      const index = alumno.personasAutorizadas.indexOf(persona);
      if (index !== -1) {
        alumno.personasAutorizadas.splice(index, 1);
      }
    });
    this._snackBar.open(`${persona.nombre} ha sido Eliminado`, 'Cerrar', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  agregarCarPool() {
    const dialogRef = this.dialog.open(CarPoolDialog, {
      data: {
        action: 'Nuevo',
        data: this.alumnos
      },
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.setCarPool(result);
        const carPool = this.service.getCarPool();
        this.carpool.push(carPool);
        this._snackBar.open(`${result.nombre} ha sido Agregado`, 'Cerrar', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }

  editarCarPool(pool: any, index: number) {
    const dialogRef = this.dialog.open(CarPoolDialog, {
      data: {
        action: 'editar',
        data: pool
      },
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.setCarPool(result);
        const carPool = this.service.getCarPool();
        this.carpool.push(carPool);
        this._snackBar.open(`${result.nombre} ha sido Actualizado`, 'Cerrar', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }

  boarrarCarPool(pool: any) {
    this.carpool.splice(this.carpool.indexOf(pool), 1);
    this._snackBar.open(`${pool.nombre} ha sido Eliminado`, 'Cerrar', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}

@Component({
  selector: 'app-car-pool-dialog',
  templateUrl: '../dialogs/carPool.html',
  standalone: true,
  imports: [MatCheckboxModule, MatSnackBarModule, CommonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule],
})
export class CarPoolDialog {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  titulo: string = '';
  selectedFile: any = null;
  profileForm = new FormGroup({
    nombre: new FormControl(''),
    telefono: new FormControl(''),
    correo: new FormControl(''),
    marca: new FormControl(''),
    placas: new FormControl(''),
    modelo: new FormControl(''),
    color: new FormControl(''),
    fotoUrl: new FormControl(''),
    alumno: new FormArray([]),
  });
  constructor(
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PersonaAutorizadaDialog>
  ) {
    this.selectedFile = '../../assets/avatar.png';
    if (data) {
      if (data.action && data.action === 'editar') {
        this.titulo = 'Editar Car Pool';
        this.selectedFile = data.data.fotoUrl || this.selectedFile;
        this.profileForm.patchValue(data.data);
      } else {
        this.titulo = 'Nuevo Car Pool';
      }
    }
  }

  seleccionar(event: MatCheckboxChange, alumno: any) {
    if (event.checked) {
      alumno.seleccionado = true;
      const alumnoArray = this.profileForm.get('alumno') as FormArray;
      alumnoArray.push(new FormControl(alumno));
      this._snackBar.open(`alumno ${alumno.nombre} seleccionado`, 'Cerrar', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else {
      alumno.seleccionado = false;
      const alumnoArray = this.profileForm.get('alumno') as FormArray;
      const index = alumnoArray.controls.findIndex(x => x.value.name === alumno.name);
      if (index !== -1) {
        alumnoArray.removeAt(index);
      }
      this._snackBar.open(`alumno ${alumno.nombre} removido`, 'Cerrar', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = window.URL.createObjectURL(event.target.files[0]);
    this.profileForm.patchValue({ fotoUrl: this.selectedFile });
    this._snackBar.open('Foto cargada de manera correcta', 'Cerrar', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: '../dialogs/agregarFamila.html',
  standalone: true,
  imports: [MatSnackBarModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule],
})
export class FamiliaDialog {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  nombreAlumno: string = this.data?.nombre || 'Nuevo Alumno(a)';
  selectedFile: any = null;
  familia = new FormGroup({
    nombre: new FormControl(''),
    grado: new FormControl(''),
    alergias: new FormControl(''),
    padre: new FormControl(''),
    telPadre: new FormControl(''),
    correoPadre: new FormControl(''),
    madre: new FormControl(''),
    telMadre: new FormControl(''),
    correoMadre: new FormControl(''),
    foto: new FormControl(''),
    maestro: new FormControl(''),
    grupo: new FormControl(''),
    fotoUrl: new FormControl(''),
    personasAutorizadas: new FormArray([]),
  });
  constructor(
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FamiliaDialog>
  ) {
    this.selectedFile = '../../assets/avatar.png';
    if (data) {
      this.selectedFile = data.fotoUrl || this.selectedFile;
      this.familia.patchValue(data);
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = window.URL.createObjectURL(event.target.files[0]);
    this.familia.patchValue({ fotoUrl: this.selectedFile });
    this._snackBar.open('Foto cargada de manera correcta', 'Cerrar', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: 'app-dialog',
  templateUrl: '../dialogs/agregarPersona.html',
  standalone: true,
  imports: [MatSnackBarModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule],
})
export class PersonaAutorizadaDialog {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  nombrePersona: string = this.data?.nombre || 'Nuevo Persona Autorizada';
  selectedFile: any = null;
  profileForm = new FormGroup({
    nombre: new FormControl(''),
    parentesco: new FormControl(''),
    marca: new FormControl(''),
    placas: new FormControl(''),
    modelo: new FormControl(''),
    color: new FormControl(''),
    fotoUrl: new FormControl(''),
  });
  constructor(
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PersonaAutorizadaDialog>
  ) {
    this.selectedFile = '../../assets/avatar.png';
    if (data) {
      this.selectedFile = data.fotoUrl || this.selectedFile;
      this.profileForm.patchValue(data);
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = window.URL.createObjectURL(event.target.files[0]);
    this.profileForm.patchValue({ fotoUrl: this.selectedFile });
    this._snackBar.open('Foto cargada de manera correcta', 'Cerrar', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
