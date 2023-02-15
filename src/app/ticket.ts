import { status } from "./enum/status.enum"

export class Ticket {
    
    id!: number;
    description!: string;
    SignalerPar!: string;
    date!: Date;
    status!: status;
    Declarant! : String ;
    asignerA! : string ;
    
}