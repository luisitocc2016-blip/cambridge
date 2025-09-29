import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatCheckboxChange } from '@angular/material/checkbox';

export interface UserData {
  id: string;
  name: string;
  enviado?: boolean;
  asistio?: boolean;
  falta?: boolean;
}

const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];


@Component({
  selector: 'app-view-maestra',
  templateUrl: './view-maestra.component.html',
  styleUrls: ['./view-maestra.component.css']
})
export class ViewMaestraComponent implements AfterViewInit{
   asistio = false;
   falta = false;
   todaysDate = new Date();
displayedColumns: string[] = ['id', 'name', 'enviado','asistio', 'falta', 'acciones'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({length: 5}, (_, k) => this.createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  alumnoEnClase(event:MatCheckboxChange, row:any){
    if(event.checked){
      row.asistio = true;
    }
  }

  faltaAlumno(event:MatCheckboxChange, row:any){
    if(event.checked){
      row.falta = true;
    }
  }

  
 createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    enviado: Math.random() < 0.5,
    asistio: false,
    falta: false,
  };
}

}
