import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";
import { Corporativo, CorporativoConsulta, CorporativoLista } from '../_models/corporativo';
import { environment } from 'environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CorporativosService {

  corporativos = environment.apiURL+'/corporativos';
  options: any;

  constructor(private http: HttpClient) {
  }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  list(): Observable<Corporativo[]> {
    return this.http
      .get<CorporativoLista>(this.corporativos,{
        headers:{
          'Authorization': "Bearer "+localStorage.getItem("tokenscloud"),
        }
      })
      .pipe(map(({data}) => data));
  }

  getById(id:number): Observable<Corporativo> {
    return this.http
      .get<CorporativoConsulta>(this.corporativos+'/'+id,{
        headers:{
          'Authorization': "Bearer "+localStorage.getItem("tokenscloud"),
        }
      })
      .pipe(map(({data}) => data.corporativo));
  }

  update(item:Corporativo): Observable<any>{
    return this.http
      .put<any>(this.corporativos+'/'+item.id,item,{
        headers:{
          'Authorization': "Bearer "+localStorage.getItem("tokenscloud"),
        }
      });
  }
}
