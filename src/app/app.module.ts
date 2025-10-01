import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';
import { DashBoardComponent } from './parent/dash-board.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfilAlumnoComponent } from './perfil-alumno/perfil-alumno.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { ViewMaestraComponent } from './view-maestra/view-maestra.component';
import { ViewAlumnoComponent } from './view-alumno/view-alumno.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ViewPadresComponent } from './view-padres/view-padres.component';
import {MatCardModule} from '@angular/material/card';
import { UniquePipe } from './unique.pipe';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import { SharedServiceService } from './shared/shared-service.service';


@NgModule({
  declarations: [
    UniquePipe,
    AppComponent,
    ChildComponent,
    DashBoardComponent,
    HeaderComponent,
    FooterComponent,
    PerfilAlumnoComponent,
    ViewMaestraComponent,
    ViewAlumnoComponent,
    ViewPadresComponent,
    UniquePipe
  ],
  imports: [
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'padres', component: ViewPadresComponent},
      {path: 'administracion', component: DashBoardComponent},
      {path: 'teacher', component: ViewMaestraComponent},
      {path: 'perfil-alumno/:id', component: ViewAlumnoComponent},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]),
    BrowserAnimationsModule,
  ],
  providers: [SharedServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
