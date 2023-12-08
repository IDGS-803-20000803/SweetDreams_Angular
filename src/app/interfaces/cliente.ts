import { Usuario } from "./usuario"

export interface Cliente {
    idCliente:number,
    nombres:string,
    apellidos:string,
    celular:string,
    codigoPostal:string,
    calle:string,
    colonia:string,
    estatus:boolean,
    idUsuario:number
}