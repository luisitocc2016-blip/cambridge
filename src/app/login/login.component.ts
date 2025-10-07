// src/app/pages/login/login.component.ts
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedServiceService } from '../shared/shared-service.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: false, // Angular 17 often uses standalone components
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, public service: SharedServiceService, public router: Router) {
    this.service.clearAlumnos();
    this.service.clearUser();
    this.service.clearCarPool();
    this.service.clearPersonaAutorizada();
  }

  login() {
    // Implement your login logic here
    this._snackBar.open(`Pendiente de implementar`, 'Cerrar', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

    // Call an authentication service to send credentials to the backend
  }
  newUser() {
    const dialogRef = this.dialog.open(NewUserDialog, {
      data: {},
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      result.grupo = 'padres';
      if (result) {
        if (result.grupo === 'padres') {
          this.service.setUser(result);
          this.router.navigate(['/padres']);
        } else if (result.grupo === 'admin') {
          this.router.navigate(['/dashboard']);
        } else if (result.grupo === 'teacher') {
          this.router.navigate(['/teacher']);
        }
        this._snackBar.open(`${result.nombre} ha sido Agregado`, 'Cerrar', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }
}

@Component({
  selector: 'app-newUser',
  templateUrl: '../dialogs/agregarNuevoUsuario.html',
  standalone: true,
  imports: [MatSnackBarModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule],
})
export class NewUserDialog {
  titulo = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  selectedFile: any = null;
  newUserForm = new FormGroup({
    nombre: new FormControl(''),
    passWord: new FormControl(''),
    //grupo: new FormControl(''),
    email: new FormControl(''),
    telefono: new FormControl(''),
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
    public dialogRef: MatDialogRef<NewUserDialog>
  ) {
    this.selectedFile = '../../assets/avatar.png';
    if (data.action === 'edit') {
      this.titulo = data.user.nombre;
      this.selectedFile = data.user.fotoUrl || this.selectedFile;
      this.newUserForm.patchValue(data.user);
    } else {
      this.titulo = 'Nuevo Usuario';
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = window.URL.createObjectURL(event.target.files[0]);
    this.newUserForm.patchValue({ fotoUrl: this.selectedFile });
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
