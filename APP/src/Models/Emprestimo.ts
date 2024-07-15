import { Livro } from "./Livro";
import { Usuario } from "./Usuario";

export interface Emprestimo{
    id?: string;
    livroid?: string;
    livro?: Livro;
    usuarioId?: string;
    usuario?: Usuario;
    dataEmprestimo?: string;
    dataDevolucao?: string;
}