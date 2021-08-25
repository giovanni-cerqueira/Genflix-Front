import { Tema } from "./Tema"
import { User } from "./User"

export class Postagem{

    public id: number
    public titulo: string
    public texto: string
    public data: Date
    public token: string
    public curtidas: number
    public tipo: string
    public usuario: User
    public tema: Tema
}


