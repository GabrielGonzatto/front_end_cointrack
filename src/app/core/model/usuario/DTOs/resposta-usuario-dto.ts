import { Usuario } from "../usuario";

export class RespostaUsuarioDTO {
    statusName!: string;
    statusCode!: number;
    mensagem!: string;
    usuario!: Usuario;
}
