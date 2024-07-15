import React, { useState, useEffect } from 'react';
import { Livro } from '../../../Models/Livro';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function LivroListar() {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const resposta = await fetch("http://localhost:5291/api/livros/listar");
            if (!resposta.ok) {
                throw new Error('Erro na resposta da API');
            }
            const dados = await resposta.json();
            setLivros(dados);
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
                <Link className='link1' to="/livros/listar"><a className='link1'>LISTAR</a></Link>
                <Link className='link2' to="/livros/cadastrar"><a className='link2'>CADASTRAR</a></Link>
                <Link className='link1' to="/livros/excluir"><a className='link2'>EXCLUIR</a></Link>
                <Link className='link1' to="/livros/editar"><a className='link2'>EDITAR</a></Link>
            </div>

            <div className="content-livros">

                <div className="box-livros">

            <table className="table table-striped table-dark">
                    <thead>
                      <tr>
                        <th className='ID' scope="col">ID</th>
                        <th className='TITULO' scope="col">TITULO</th>
                        <th className='AUTOR' scope="col">AUTOR</th>
                        <th className='ANO' scope="col">ANO PUBLICAÇÃO</th>
                        <th className='QUANTIDADE' scope="col">QUANTIDADE LIVROS</th>
                      </tr>
                      
                    </thead>
                    
                    {livros.slice().reverse().map((livro) => 
                    <tbody>
                      <tr key={livro.id}>
                        <th scope="row">{livro.id}</th>
                        <td>{livro.titulo}</td>
                        <td>{livro.autor}</td>
                        <td>{livro.anoPublicacao}</td>
                        <td>{livro.quantidadeLivro}</td>
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

export default LivroListar;