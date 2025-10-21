import { AfterViewInit, Component, Inject, OnInit, viewChild, ViewChild } from '@angular/core';
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
import { SafeUrl } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';


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
  personasAutorizadas: any = [];
  qrCode: string = '';

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
    const personasAutorizadas = this.service.getPersonaAutorizada();
    if (personasAutorizadas) {
      this.personasAutorizadas.push(personasAutorizadas);
    }
  }

  verQr(user: any) {
    this.dialog.open(qRDialog, {
      data: user.qrCode,
      width: '50%',
      disableClose: false
    });
  }

  generateQr(usuario: any, data: string) {
    this.qrCode = '';
    if (data === 'persona') {
      this.qrCode = JSON.stringify(usuario);
      const findPersona = this.personasAutorizadas.find((p: any) => p.nombre === usuario.nombre);
      if (findPersona) {
        findPersona.qrCode = this.qrCode;
      }
      this.service.setPersonaAutorizada(findPersona);
      const personasAutorizadas = this.service.getPersonaAutorizada();
      this.personasAutorizadas = [];
      this.personasAutorizadas.push(personasAutorizadas);
    }
    if (data === 'pool') {
      usuario.qrCarPool = true;
      usuario.alumno.forEach((al: any) => {
        al.qrCarPool = true;
      });
      this.qrCode = JSON.stringify(usuario);
      usuario.qrCode = this.qrCode;
      this.carpool.splice(this.carpool.indexOf(usuario), 1);
      this.service.setCarPool(usuario);
      const carPool = this.service.getCarPool();
      this.carpool.push(carPool);
    }
    if (data === 'user') {
      usuario.qrUser = true;
      this.qrCode = JSON.stringify(usuario);
      usuario.qrCode = this.qrCode;
      this.users.splice(this.users.indexOf(usuario), 1);
      this.service.setUser(usuario);
      const users = this.service.getUser();
      this.users.push(users);
    }
    if (data === 'alumno') {
      usuario.qrAlumno = true;
      this.qrCode = JSON.stringify(usuario);
      usuario.qrCode = this.qrCode;
      this.alumnos.splice(this.alumnos.indexOf(usuario), 1);
      this.service.setAlumnos(usuario);
      const alumnos = this.service.getAlumnos();
      this.alumnos.push(alumnos);
    }
    this.dialog.open(qRDialog, {
      data: this.qrCode,
      width: '50%',
      disableClose: false
    });
  }

  agregarUser() {
    const dialogRef = this.dialog.open(NewUserDialog, {
      data: { action: 'nuevo' },
      width: '25%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        /*  if(this.alumnos.length > 0){
           result.hijos = this.alumnos;
         } */
        this.service.setUser(result);
        const users = this.service.getUser();
        this.users = [];
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
      width: '25%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        /*  if(!result.hasOwnProperty('hijos')){
           result.hijos = this.alumnos;
         }  */
        this.service.clearUser();
        this.service.setUser(result);
        const users = this.service.getUser();
        this.users = [];
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
    this.users = [];
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
      width: '25%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        /*  if(this.users.length > 0){
             this.users[0].hijos = [];
           this.users[0].hijos.push(result);
         }
         this.service.clearUser();
         this.service.setUser(this.users[0]); */
        //set alumnos
        this.alumnos = [];
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
      width: '25%'
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
    this.service.clearAlumnos();
    this._snackBar.open(`${alumno.nombre} ha sido Eliminado`, 'Cerrar', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  agregarPersona() {
    const dialogRef = this.dialog.open(PersonaAutorizadaDialog, {
      data: {},
      width: '25%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.qrCode = '';
        result.qrPersonaAutorizada = true;
        // result.hijos = this.alumnos;
        this.service.setPersonaAutorizada(result);
        const personasAutorizadas = this.service.getPersonaAutorizada();
        this.personasAutorizadas = [];
        this.personasAutorizadas.push(personasAutorizadas);

        this._snackBar.open(`${result.nombre} ha sido Agregado`, 'Cerrar', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }

  editarPersona(persona: any) {
    const dialogRef = this.dialog.open(PersonaAutorizadaDialog, {
      data: persona,
      width: '25%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.clearPersonaAutorizada();
        this.service.setPersonaAutorizada(result);
        const personasAutorizadas = this.service.getPersonaAutorizada();
        this.personasAutorizadas = [];
        this.personasAutorizadas.push(personasAutorizadas);
        this._snackBar.open(`${result.nombre} ha sido Actualizado`, 'Cerrar', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }

  borrarPersona(persona: any) {
    this.service.clearPersonaAutorizada();
    this.personasAutorizadas = [];
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
      width: '27%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.setCarPool(result);
        const carPool = this.service.getCarPool();
        this.carpool = [];
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
      width: '27%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carpool.splice(this.carpool.indexOf(pool), 1);
        this.service.setCarPool(result);
        const carPool = this.service.getCarPool();
        this.carpool = [];
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
    this.service.clearCarPool();
    this.carpool = [];
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
    alumnoSeleccionado: new FormControl(''),
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
        if (data.data.alumno && Array.isArray(data.data.alumno)) {
          const alumnoArray = this.profileForm.get('alumno') as FormArray;
          data.data.alumno.forEach((alumno: any) => {
            alumno.seleccionado = true;
            alumnoArray.push(new FormControl(alumno));
          });
        }
      } else {
        this.titulo = 'Nuevo Car Pool';
      }
    }
  }

  seleccionar(event: MatCheckboxChange, alumno: any) {
    if (event.checked) {
      alumno.seleccionado = true;
      this.profileForm.patchValue({ alumnoSeleccionado: alumno.nombre });
      /*  const alumnoArray = this.profileForm.get('alumno') as FormArray;
       alumnoArray.push(new FormControl(alumno)); */
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
  selector: 'app-dialog-qr',
  templateUrl: '../dialogs/qR.html',
  standalone: true,
  imports: [CommonModule, MatDialogModule, QRCodeModule, MatIconModule, MatButtonModule],
})
export class qRDialog {
  qrCode: string = '';
  qrCodeDownloadLink: SafeUrl = "";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FamiliaDialog>
  ) {
    if (data) {
      this.qrCode = data;
    }
  }

  async shareQrCode() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My QR Code',
          text: 'Scan this QR code!',
          url: this.qrCode // Or a URL to the generated image
        });
        console.log('QR Code shared successfully');
      } catch (error) {
        console.error('Error sharing QR Code:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      alert('Web Share API is not supported in this browser.');
    }
  }
  onCloseClick(): void {
    this.dialogRef.close();
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
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
    foto: new FormControl(''),
    grupo: new FormControl(''),
    fotoUrl: new FormControl(''),
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
  imports: [MatSnackBarModule, MatSelectModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule],
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
