import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Corporativo } from 'app/corporativos/_models/corporativo';
import { CorporativosService } from 'app/corporativos/_services/corporativos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-corporativos-detalle-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss']
})
export class DatosComponent implements OnInit {
  @Input('corporativo')corporativo:Corporativo;

  isEdit:boolean = false;
  isLoading:boolean = false;
  D_FechaIncorporacion:any;

  statusOptions = [
    { id: 0, name: 'Inactivo' },
    { id: 1, name: 'Activo' },
  ];

  corporativoForm = new FormGroup({
    S_NombreCorto: new FormControl('', [Validators.required]),
    S_NombreCompleto: new FormControl('', [Validators.required]),
    S_Activo: new FormControl(0, [Validators.required]),
    D_FechaIncorporacion: new FormControl('', [Validators.required]),
    S_SystemUrl: new FormControl('', [Validators.required]),
  });

  constructor(
    private corporativoService: CorporativosService,
    private location: Location
  ) { }

  get cf() {
    return this.corporativoForm.controls;
  }

  ngOnInit(): void {
    this.setValues(this.corporativo);
    this.corporativoForm.disable();
  }

  setValues(corporativo:Corporativo){
    const fecha = new Date(corporativo.D_FechaIncorporacion);
    this.corporativoForm.patchValue({
      ...corporativo,
      D_FechaIncorporacion: {year: fecha.getFullYear(), month: fecha.getMonth() + 1, day: fecha.getDate()},
    },{
      emitEvent:false
    });
  }

  onClickRegresar(){
    if(this.isEdit){
      this.isEdit = false;
      this.setValues(this.corporativo);
      this.corporativoForm.disable();
    } else {
      this.location.back();
    }
  }

  onClickEditar(){
    this.isEdit = !this.isEdit;
    if(this.isEdit){
      this.corporativoForm.enable();
    } else {
      if(!this.corporativoForm.valid){
        return;
      }
      this.isLoading = true;
      const date = this.cf.D_FechaIncorporacion.value;
      const corporativo = {
        ...this.corporativo,
        ...this.corporativoForm.value,
        D_FechaIncorporacion: `${date.year}-${date.month}-${date.day}`
      }
      this.corporativoService.update(corporativo).subscribe(()=>{
        this.isLoading = false;
        Swal.fire({
          icon: "success",
          title: 'EDITADO!',
          text: 'El corporativo fue editado.',
          customClass: {
            confirmButton: 'btn btn-success'
          },
        })
      },()=>{
        this.isLoading = false;
      })
      this.corporativoForm.disable();
    }
  }

}
