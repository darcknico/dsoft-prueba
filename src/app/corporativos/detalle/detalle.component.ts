import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Corporativo } from '../_models/corporativo';
import { CorporativosService } from '../_services/corporativos.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  corporativo:Corporativo;
  id:number;

  constructor(
    private corporativosService: CorporativosService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.spinner.show();
    this.actualizar();
  }

  actualizar(){
    this.corporativosService.getById(this.id).subscribe((response)=>{
      this.corporativo = response;
      this.spinner.hide();
    });
  }
}
