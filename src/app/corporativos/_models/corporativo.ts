export interface CorporativoLista {
  data:Corporativo[];
}

export interface CorporativoConsulta {
  data:CorporativoConsultaData;
}

export interface CorporativoConsultaData {
  corporativo:Corporativo;
}

/**
 * {
      "id": 92,
      "S_NombreCorto": "Tepeyac",
      "S_NombreCompleto": "Instituto Tepeyac",
      "S_LogoURL": "https://devschoolcloud.com/api/public/logos/JIYuxX9v5hsLGXGDdLql3y1EbeSqvqDMtetlhKfY.png",
      "S_DBName": "tepeyac",
      "S_DBUsuario": "tepeyac",
      "S_SystemUrl": "tepeyac",
      "S_Activo": 0,
      "D_FechaIncorporacion": "2021-08-06 00:00:00",
      "created_at": "2021-05-24T16:28:47.000000Z",
      "updated_at": "2021-08-20T01:36:07.000000Z",
      "tw_users_id": 2,
      "FK_Asignado_id": 13,
      "user_created": {
        "id": 2,
        "username": "pvelasco",
        "email": "pvelasco@dannyyesoft.mx",
        "S_Nombre": "Patricia",
        "S_Apellidos": "Velasco",
        "S_FotoPerfilURL": "https://lh3.google.com/u/0/ogw/ADGmqu8Pee1cDKwPdmdySQ-ZhE4l743da-uInfsDabzv=s192-c-mo",
        "S_Activo": 1,
        "verification_token": "11bmQgQEIQsTJFcpVG7BD7KeS14lw0hD2OTtd1FzcT45QhCjaSOZvKGihRyO1wPlffvkjh1qfjSYtuT8vDCC2qmkFeabdLwvokgJ",
        "verified": "1",
        "tw_role_id": 1,
        "created_at": "2020-08-27T20:07:51.000000Z",
        "updated_at": "2021-02-03T18:13:09.000000Z",
        "deleted_at": null,
        "banned": 0
      },
      "asignado": {
        "id": 13,
        "username": "soporte",
        "email": "root@dannyyesoft.mx",
        "S_Nombre": "Soporte",
        "S_Apellidos": "Dannyyesoft",
        "S_FotoPerfilURL": "https://www.flaticon.com/svg/static/icons/svg/172/172163.svg",
        "S_Activo": 1,
        "verification_token": "11bmQgQEIQsTJFcpVG7BD7KeS14lw0hD2OTtd1FzcT45QhCjaSOZvKGihRyO1wPlffvkjh1qfjSYtuT8vDCC2qmkFeabdLwvokgJ",
        "verified": "1",
        "tw_role_id": 2,
        "created_at": "2020-08-27T20:07:51.000000Z",
        "updated_at": "2020-09-24T19:27:38.000000Z",
        "deleted_at": null,
        "banned": 0
      }
    },
 */
export interface Corporativo {
  id:                   number;
  S_NombreCorto:        string;
  S_NombreCompleto:     string;
  S_LogoURL:            string;
  S_DBName:             string;
  S_DBUsuario:          string;
  S_SystemUrl:          string;
  S_Activo:             number;
  D_FechaIncorporacion: Date;
  created_at:           Date;
  updated_at:           Date;
  tw_users_id:          number;
  FK_Asignado_id:       number;
  user_created:         Usuario;
  asignado:             Usuario;
  tw_empresas_corporativo:   EmpresaCorporativo[];
  tw_contactos_corporativo:  ContactoCorporativo[];
  tw_contratos_corporativo:  ContratoCorporativo[];
  tw_documentos_corporativo: DocumentoCorporativo[];
}

export interface Usuario {
  id:                 number;
  username:           string;
  email:              string;
  S_Nombre:           string;
  S_Apellidos:        string;
  S_FotoPerfilURL:    string;
  S_Activo:           number;
  verification_token: null | string;
  verified:           string;
  tw_role_id:         number;
  created_at:         Date;
  updated_at:         Date;
  deleted_at:         null;
  banned:             number;
}

export interface ContactoCorporativo {
  id:                number;
  S_Nombre:          string;
  S_Puesto:          string;
  S_Comentarios:     string;
  N_TelefonoFijo:    number;
  N_TelefonoMovil:   number;
  S_Email:           string;
  created_at:        Date;
  updated_at:        Date;
  tw_corporativo_id: number;
}

export interface ContratoCorporativo {
  id:                number;
  D_FechaInicio:     Date;
  D_FechaFin:        Date;
  S_URLContrato:     null | string;
  created_at:        Date;
  updated_at:        Date;
  tw_corporativo_id: number;
}

export interface DocumentoCorporativo {
  id:                number;
  tw_corporativo_id: number;
  tw_documento_id:   number;
  S_ArchivoUrl:      null | string;
  created_at:        Date;
  updated_at:        Date;
  tw_documento:      TwDocumento;
}

export interface TwDocumento {
  id:            number;
  S_Nombre:      string;
  N_Obligatorio: number;
  S_Descripcion: string;
  created_at:    Date;
  updated_at:    Date;
}

export interface EmpresaCorporativo {
  id:                    number;
  S_RazonSocial:         string;
  S_RFC:                 string;
  S_Pais:                string;
  S_Estado:              string;
  S_Municipio:           string;
  S_ColoniaLocalidad:    string;
  S_Domicilio:           string;
  N_CodigoPostal:        string;
  S_UsoCFDI:             string;
  S_UrlRFC:              null | string;
  S_UrlActaConstitutiva: null | string;
  S_Activo:              number;
  S_Comentarios:         null;
  created_at:            Date;
  updated_at:            Date;
  tw_corporativo_id:     number;
}
