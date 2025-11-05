import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SharedServiceService } from '../shared/shared-service.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-maestra',
  templateUrl: './view-maestra.component.html',
  styleUrls: ['./view-maestra.component.css']
})
export class ViewMaestraComponent implements AfterViewInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  asistio = false;
  falta = false;
  todaysDate = new Date();
  displayedColumns: string[] = ['nombre', 'grado', 'entregado'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public service: SharedServiceService, private _snackBar: MatSnackBar) {
    const users = this.service.getListaDeEntregaAlumnos();
    if (users[0]) {
      this.dataSource = new MatTableDataSource(users[0].hijos);
    }
  }
  ngAfterViewInit() {
    if (!this.dataSource) {
      return;
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  alumnoEntregado(event: MatCheckboxChange, row: any) {
    if (event.checked) {
      row.entregado = true;
      this.service.listaDeEntregaAlumnos = [];
      this.dataSource.data = this.dataSource.data.filter(item => item !== row);
      this._snackBar.open(`${row.nombre} ha sido Entregado`, 'Cerrar', {
        duration: 1000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

}
