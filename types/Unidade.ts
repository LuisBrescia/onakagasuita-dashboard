export type Unidade = {
    id: number;
    ativo: boolean;
    cep: string;
    cidade: string;
    email: string;
    foto: string | null;
    franquia_id: number | null;
    logradouro: string;
    nome_fantasia: string;
    telefone: string;
}

export type UnidadeRequest = {
    franquia_id: number | null;
    nome_fantasia: string;
    telefone: string;
    email: string;
    cep: string;
    cidade: string;
    logradouro: string;
}

export type UnidadeGetAllQuerys = {
    page?: number;
    perPage?: number;
    all?: boolean;
}