import { Status } from "./Status";
import { User } from "./user";

export class Ticket {

    id!: number;
    libelle !: string;
    assigne!: User;
    declarant!: User;
    status !: Status ;
    creationdate !: Date ;
    image!:File


}
