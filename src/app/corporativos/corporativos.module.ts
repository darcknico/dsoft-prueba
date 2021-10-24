import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporativosComponent } from './corporativos/corporativos.component';
import { CorporativosRoutingModule } from './corporativos-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DetalleComponent } from './detalle/detalle.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatosComponent } from './detalle/datos/datos.component';
import { ContactosComponent } from './detalle/contactos/contactos.component';

@NgModule({
  imports: [
    CommonModule,
    CorporativosRoutingModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    NgbModule,
  ],
  declarations: [
    CorporativosComponent,
    DetalleComponent,
    DatosComponent,
    ContactosComponent
  ],
})
export class CorporativosModule { }
