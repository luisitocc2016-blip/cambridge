// src/app/pages/login/login.component.ts
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedServiceService } from '../shared/shared-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false, // Angular 17 often uses standalone components
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });

  constructor(public dialog: MatDialog, public service:SharedServiceService, public router:Router) { }

  login() {
    // Implement your login logic here
    console.log('Login attempt with:', this.loginForm.value);
    // Call an authentication service to send credentials to the backend
  }
   newUser() {
      const dialogRef = this.dialog.open(NewUserDialog, {
        data: {},
        width: '40%'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.setUser(result);
          this.router.navigate(['/padres']);
        }
      });
    }
}

@Component({
  selector: 'app-newUser',
  templateUrl: '../dialogs/agregarNuevoUsuario.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule],
})
export class NewUserDialog {
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewUserDialog>
  ) {
    this.selectedFile = '../../assets/avatar.png';
    if (data) {
      this.selectedFile = data.fotoUrl || this.selectedFile;
      this.profileForm.patchValue(data);
    }
    console.log(data);

  }

  onFileSelected(event: any): void {
    this.selectedFile = window.URL.createObjectURL(event.target.files[0]);
    this.profileForm.patchValue({ fotoUrl: this.selectedFile });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
