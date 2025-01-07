import { DiasSemana } from "@/enums/DiasSemana";

export type Salao = {
    id: number;
    ativo: boolean;
    nome: string;
    unidade_id: number;
    horario_funcionamento_inicio: string;
    horario_funcionamento_fim: string;
    dias_funcionamento: Set<DiasSemana>;
}

export type SalaoRequest = {
    nome: string;
    ativo: boolean;
    horario_funcionamento_inicio: string;
    horario_funcionamento_fim: string;
    dias_funcionamento: Set<DiasSemana>;
}

// "horario_funcionamento_inicio": "12:00:00",
// "horario_funcionamento_fim": "19:00:00",