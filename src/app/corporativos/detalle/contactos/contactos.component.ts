import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ContactoCorporativo, Corporativo } from 'app/corporativos/_models/corporativo';
import { ContactosService } from 'app/corporativos/_services/contactos.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-corporativos-detalle-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit, OnChanges {
  @Input('corporativo')  corporativo: Corporativo;
  @Output('actualizar') actualizar = new EventEmitter<ContactoCorporativo>();

  contactos:ContactoCorporativo[]=[];
  public ColumnMode = ColumnMode;
  public limitRef = 10;

  contactoForm = new FormGroup({
    S_Nombre: new FormControl('', [Validators.required]),
    S_Puesto: new FormControl('', [Validators.required]),
    S_Comentarios: new FormControl('', []),
    N_TelefonoFijo: new FormControl('', []),
    N_TelefonoMovil: new FormControl('', []),
    S_Email: new FormControl('', [Validators.required,Validators.email]),
  });

  contacto:ContactoCorporativo;
  isEdit:boolean = false;
  isLoading:boolean = false;

  constructor(
    private contactosService:ContactosService,
  ) { }

  get cf() {
    return this.contactoForm.controls;
  }

  ngOnInit(): void {
    this.actualizarContactos();
  }

  ngOnChanges(changes: SimpleChanges){
    this.actualizarContactos();
  }

  actualizarContactos(){
    this.contactos = this.corporativo.tw_contactos_corporativo;
  }

  onClickEdit(item:ContactoCorporativo){
    this.contacto = item;
    this.isEdit = true;
    this.contactoForm.patchValue(item);
  }

  onClickDelete(item:ContactoCorporativo){
    this.contactoForm.reset();
    this.contacto = null;
    this.isEdit = false;

    swal.fire({
      title: 'Esta seguro de eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2F8BE6',
      cancelButtonColor: '#F55252',
      confirmButtonText: 'CONTINUAR',
      cancelButtonText: 'CANCELAR',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.contactosService.remove(item.id).subscribe((response)=>{
          this.actualizar.next(response);
          swal.fire({
            icon: "success",
            title: 'ELIMINADO!',
            text: 'El contacto fue eliminado.',
            customClass: {
              confirmButton: 'btn btn-success'
            },
          })
        })
      }
    });
  }

  onSubmit(){
    if(!this.contactoForm.valid){
      return;
    }
    const contacto:ContactoCorporativo = this.contactoForm.value;
    this.isLoading = true;
    if(this.contacto){
      this.contactosService.update({
        ...this.contacto,
        ...contacto,
      }).subscribe((response)=>{
        this.contactoForm.reset();
        this.actualizar.next(response);
        this.isLoading = false;
        swal.fire({
          icon: "success",
          title: 'EDITADO!',
          text: 'El contacto fue editado.',
          customClass: {
            confirmButton: 'btn btn-success'
          },
        })
      },()=>{
        this.isLoading = false;
      })
    } else {
      this.contactosService.add({
        ...contacto,
        tw_corporativo_id: this.corporativo.id,
      }).subscribe((response)=>{
        this.contactoForm.reset();
        this.actualizar.next(response);
        this.isLoading = false;
        swal.fire({
          icon: "success",
          title: 'AGREGADO!',
          text: 'El contacto fue agregado.',
          customClass: {
            confirmButton: 'btn btn-success'
          },
        })
      },()=>{
        this.isLoading = false;
      })
    }
    this.contacto = null;
  }

}
