import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporativosComponent } from './corporativos/corporativos.component';
import { DetalleComponent } from './detalle/detalle.component';


const routes: Routes = [
  {
    path: '',
    component: CorporativosComponent,
    data: {
      title: 'Corporativos'
    }
  },
  {
    path: 'detalle/:id',
    component: DetalleComponent,
    data: {
      title: 'Corporativos'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporativosRoutingModule { }
