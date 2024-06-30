import React, { useState, useEffect } from 'react';
import { Emprestimo } from '../../../Models/Emprestimo';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function EmprestimoListar() {
    const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const resposta = await fetch("http://localhost:5291/api/emprestimos/listar");
            if (!resposta.ok) {
                throw new Error('Erro na resposta da API');
            }
            const dados = await resposta.json();
            setEmprestimos(dados);
        } catch (erro) {
            console.error("Erro ao carregar dados", erro);
            setError("Erro ao carregar dados");
        }
    };

    return (
        <div className='listarLivros'>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
            
            <div className='TituloListar'>
                <Link className='link1' to="/emprestimos/listar"><a className='link1'>LISTAR</a></Link>
                <Link className='link2' to="/emprestimos/cadastrar"><a className='link2'>CADASTRAR</a></Link>
                <Link className='link1' to="/emprestimos/excluir"><a className='link2'>EXCLUIR</a></Link>
            </div>

            <div className="content-livros">
                <div className="box-livros">
            <table className="table table-striped table-dark">
                    <thead>
                      <tr>
                        <th className='ANO' scope="col">ID</th>
                        <th className='ANO' scope="col">LIVRO ID</th>
                        <th className='ANO' scope="col">LIVRO</th>
                        <th className='ANO' scope="col">USUARIO ID</th>
                        <th className='ANO' scope="col">USUARIO</th>
                        <th className='ANO' scope="col">DATA EMPRESTIMO</th>
                        <th className='ANO' scope="col">DATA DEVOLUÇÃO</th>
                      </tr>
                    </thead>
                    
                    {emprestimos.slice().reverse().map((emprestimo) => 
                    <tbody>
                      <tr key={emprestimo.id}>
                        <th scope="row">{emprestimo.id}</th>
                        <td>{emprestimo.livro?.id}</td>
                        <td>{emprestimo.livro?.titulo}</td>
                        <td>{emprestimo.usuario?.id}</td>
                        <td>{emprestimo.usuario?.nome}</td>
                        <td>{emprestimo.dataEmprestimo}</td>
                        <td>{emprestimo.dataDevolucao}</td>
                      </tr>
                    </tbody>
                    )}
                    </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmprestimoListar;