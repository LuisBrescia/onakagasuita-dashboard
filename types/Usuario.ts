type TipoUsuario = 'admin' | 'operador' | 'cliente';

export type Usuario = {
    id: number;
    nome: string,
    email: string;
    status: boolean;
    tipo: TipoUsuario;
}