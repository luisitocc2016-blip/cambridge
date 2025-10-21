import { Component, Inject, ViewChild } from '@angular/core';
import { SharedServiceService } from '../shared/shared-service.service';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat, Result } from '@zxing/library'; // Import Result if you need detailed scan info
import { filter } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PersonaAutorizadaDialog } from '../view-padres/view-padres.component';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-scanner',
  standalone: false,
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css'
})
export class ScannerComponent {
  @ViewChild('scanner') scanner2!: ZXingScannerComponent;
  qrResultString: any = [];
  qrResult!: Result; // Optional: for more detailed scan data 
  scannerEnabled: boolean = true;
  format = [BarcodeFormat.QR_CODE];
  availableDevices: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | undefined;
  alumnos: any = [];
  users: any = [];
  carpool: any = [];
  personasAutorizadas: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(public service: SharedServiceService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
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
    this.personasAutorizadas.push(personasAutorizadas);
  }


  onScanSuccess(resultString: string) {
    this.stopScanner();
    this.qrResultString.push(JSON.parse(resultString));
    if (Array.isArray(this.qrResultString) && this.qrResultString.length > 0) {
      if (this.qrResultString[0].hasOwnProperty('qrUser')) {
        if (this.users.length > 0) {
          const findUser = this.users.filter((user: any) => user.nombre === this.qrResultString[0].nombre);
          if (this.alumnos.length > 0) {
            findUser[0].hijos = this.alumnos;
          }
          if (findUser.length > 0) {
            this.dialog.open(successQrDialog, {
              data: {
                parentesco: 'Tutor',
                user: findUser[0],
              },
              width: '35%',
              disableClose: false
            });
            this._snackBar.open(`Verificacion: Qr Valido`, 'Cerrar', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              panelClass: ['success-snackbar']
            });
          } else {
            this._snackBar.open(`Verificacion: Qr Invalido`, 'Cerrar', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              panelClass: ['error-snackbar']
            });
          }
        }
      } else if (this.qrResultString[0].hasOwnProperty('qrCarPool')) {
        if (this.carpool.length > 0) {
          const findUser = this.carpool.filter((user: any) => user.nombre === this.qrResultString[0].nombre);
          if (this.alumnos.length > 0) {
            const findAlumno = this.alumnos.filter((alumno: any) => alumno.nombre === findUser[0].alumnoSeleccionado);
            if (findAlumno.length > 0) {
              findUser[0].hijos = [findAlumno[0]];
            }
          }
          if (findUser.length > 0) {
            this.dialog.open(successQrDialog, {
              data: {
                parentesco: 'Car-Pool',
                user: findUser[0],
              },
              width: '35%',
              disableClose: false
            });
            this._snackBar.open(`Verificacion: Qr Valido`, 'Cerrar', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              panelClass: ['success-snackbar']
            });
          } else {
            this._snackBar.open(`Verificacion: Qr Invalido`, 'Cerrar', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              panelClass: ['error-snackbar']
            });
          }
        }
      } else if (this.qrResultString[0].hasOwnProperty('qrAlumno')) {
        if (this.alumnos.length > 0) {
          const findUser = this.alumnos.filter((user: any) => user.nombre === this.qrResultString[0].nombre);
          if (findUser.length > 0) {
            this.dialog.open(successQrDialog, {
              data: {
                parentesco: 'Alumno',
                user: findUser[0],
              },
              width: '35%',
              disableClose: false
            });
            this._snackBar.open(`Verificacion: Qr Valido`, 'Cerrar', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              panelClass: ['success-snackbar']
            });
          } else {
            this._snackBar.open(`Verificacion: Qr Invalido`, 'Cerrar', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              panelClass: ['error-snackbar']
            });
          }
        }
      } else if (this.qrResultString[0].hasOwnProperty('qrPersonaAutorizada')) {
        if (this.personasAutorizadas.length > 0) {
          const findUser = this.personasAutorizadas.filter((user: any) => user.nombre === this.qrResultString[0].nombre);
          if (findUser.length > 0) {
            if (this.alumnos.length > 0) {
              findUser[0].hijos = this.alumnos;
            }
            this.dialog.open(successQrDialog, {
              data: {
                parentesco: 'Persona Autorizada',
                user: findUser[0],
              },
              width: '35%',
              disableClose: false
            });
            this._snackBar.open(`Verificacion: Qr Valido`, 'Cerrar', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              panelClass: ['success-snackbar']
            });
          } else {
            this._snackBar.open(`Verificacion: Qr Invalido`, 'Cerrar', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              panelClass: ['error-snackbar']
            });
          }
        }
      }
    }
  }

  onScanError(error: Error): void {
    console.error('Scan error:', error);
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    if (this.availableDevices.length > 0) {
      this.selectedDevice = this.availableDevices[0]; // Select first camera by default
    }
  }

  startScanner(): void {
    this.scannerEnabled = true;
  }

  stopScanner(): void {
    this.scannerEnabled = false;
  }

  clearResult(): void {
    this.qrResultString = '';
    //this.qrResult = null;
  }
}

@Component({
  selector: 'app-success-qr-dialog',
  templateUrl: '../dialogs/successQrDialog.html',
  standalone: true,
  imports: [MatCheckboxModule, MatSelectModule, MatSnackBarModule, CommonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule],
})
export class successQrDialog {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  titulo: string = '';
  selectedFile: any = null;

  constructor(
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PersonaAutorizadaDialog>
  ) {
    this.selectedFile = '../../assets/avatar.png';
    if (data.parentesco === 'Tutor') {
      this.titulo = `Qr Valido - ${data.parentesco}`;
      this.selectedFile = data.user.fotoUrl || this.selectedFile;
    } else if (data.parentesco === 'Car-Pool') {
      this.titulo = `Qr Valido - ${data.parentesco}`;
      this.selectedFile = data.user.fotoUrl || this.selectedFile;
    } else if (data.parentesco === 'Alumno') {
      this.titulo = `Qr Valido - ${data.parentesco}`;
      this.selectedFile = data.user.fotoUrl || this.selectedFile;
    } else if (data.parentesco === 'Persona Autorizada') {
      this.titulo = `Qr Valido - ${data.parentesco}`;
      this.selectedFile = data.user.fotoUrl || this.selectedFile;
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
