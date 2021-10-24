import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";
import { ContactoCorporativo, Corporativo, CorporativoConsulta, CorporativoLista } from '../_models/corporativo';
import { environment } from 'environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  contactos = environment.apiURL+'/contactos';
  options: any;

  constructor(private http: HttpClient) {

  }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  add(item:ContactoCorporativo): Observable<ContactoCorporativo>{
    return this.http
      .post<ContactoCorporativo>(this.contactos,item,{
        headers:{
          'Authorization': "Bearer "+localStorage.getItem("tokenscloud"),
        }
      });
  }

  update(item:ContactoCorporativo): Observable<any>{
    return this.http
      .put<any>(this.contactos+'/'+item.id,item,{
        headers:{
          'Authorization': "Bearer "+localStorage.getItem("tokenscloud"),
        }
      });
  }

  remove(id:number): Observable<any>{
    return this.http
      .delete<any>(this.contactos+'/'+id,{
        headers:{
          'Authorization': "Bearer "+localStorage.getItem("tokenscloud"),
        }
      });
  }
}
