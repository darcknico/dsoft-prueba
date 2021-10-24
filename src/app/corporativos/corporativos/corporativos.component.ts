import { Component, OnInit, ViewChild } from '@angular/core';
import { CorporativosService } from '../_services/corporativos.service';
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";
import { Corporativo } from '../_models/corporativo';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-corporativos',
  templateUrl: './corporativos.component.html',
  styleUrls: ['./corporativos.component.scss']
})
export class CorporativosComponent implements OnInit {

  constructor(
    private corporativosService: CorporativosService,
    private spinner: NgxSpinnerService,
    ) { }

  @ViewChild(DatatableComponent) table: DatatableComponent;

  public rows:Corporativo[] = [];
  public ColumnMode = ColumnMode;
  public limitRef = 10;

  public columns = [
    { name: "Corporativo", prop: "S_SystemUrl" },
    { name: "URL", prop: "S_SystemUrl" },
    { name: "Incorporacion", prop: "D_FechaIncorporacion" },
    { name: "Creado El", prop: "user_created" },
    { name: "Asignado A", prop: "asignado" },
    { name: "Status", prop: "S_Activo" },
    { name: "Acciones", prop: "Acciones" },
  ];

  /**
   * updateLimit
   *
   * @param limit
   */
  updateLimit(limit) {
    this.limitRef = limit.target.value;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.corporativosService.list().subscribe((rows)=>{
      this.rows = rows;
      this.spinner.hide();
    },()=>{
      this.spinner.hide();
    });
  }

}
