import { status } from "./enum/status.enum"
import { User } from "./user";

export class Ticket {
    
    id!: number;
    libelle !: string;
    assigne!: User;
    declarant!: User;
    status !: any ;
    creationdate !: Date ;

    
    
}