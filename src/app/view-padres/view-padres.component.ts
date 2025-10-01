import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedServiceService } from '../shared/shared-service.service';


@Component({
  selector: 'app-view-padres',
  templateUrl: './view-padres.component.html',
  styleUrls: ['./view-padres.component.css']
})
export class ViewPadresComponent implements OnInit {
  alumnos: any = this.service.getAlumnos();
  constructor(private router: Router, public dialog: MatDialog, public service:SharedServiceService) { }

  ngOnInit(): void { }


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
      if(result){
        this.service.setAlumnos(result);
        this.alumnos = this.service.getAlumnos();
      }
      
    });
  }

  editarAlumno(alumno: any) {
      const dialogRef = this.dialog.open(FamiliaDialog, {
      data: alumno,
      width: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
     // this.service.setAlumnos(result);
      //this.alumnos = this.service.getAlumnos();
      
    });
    //this.router.navigate(['/perfil-alumno', alumno.id]);
  }

  borrarAlumno(alumno: any) {
    this.alumnos.splice(this.alumnos.indexOf(alumno), 1);
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
          if( Array.isArray(alumno.personasAutorizadas) && alumno.personasAutorizadas.length > 0 ){
            alumno.personasAutorizadas.forEach((p: any) => {
            if (p.nombre.toUpperCase() === result.nombre.toUpperCase()) {
              existe = true;
            }
          });
          }
        });
        if (!existe) {
          console.log(this.alumnos);
          
          this.alumnos.forEach((alumno: any) => {
            alumno.personasAutorizadas.push(result);
          });
        }
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
      console.log('aqui se actualiza el registro de la persona en base de datos');
    });
  }

  borrarPersona(persona: any) {
     this.alumnos.forEach((alumno: any) => {
      alumno.personasAutorizadas = alumno.personasAutorizadas.filter((p: any) => p.nombre !== persona.nombre);
    });
  }

  /* cargarHermanos(alumno: any) {
     this.alumno = this.alumnos.filter(
      (item: { id: number }) => item.id === alumno.id
    )[0];

  } */

}

@Component({
  selector: 'app-dialog',
  templateUrl: '../dialogs/agregarFamila.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule],
})
export class FamiliaDialog {
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FamiliaDialog>
  ) {
    this.selectedFile = '../../assets/avatar.png';
    if (data) {
      this.selectedFile = data.fotoUrl || this.selectedFile;
      this.familia.patchValue(data);
    }
    console.log(data);

  }

  onFileSelected(event: any): void {
    this.selectedFile = window.URL.createObjectURL(event.target.files[0]);
    this.familia.patchValue({ fotoUrl: this.selectedFile });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: 'app-dialog',
  templateUrl: '../dialogs/agregarPersona.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule],
})
export class PersonaAutorizadaDialog {
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
    public dialogRef: MatDialogRef<PersonaAutorizadaDialog>
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
