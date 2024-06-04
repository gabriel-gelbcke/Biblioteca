import React, { useState, useEffect } from 'react';
import { Livro } from '../../../Models/Livro';

function LivroListar() {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("Executar algo ao carregar o componente...");
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
            console.error("Deu erro!", erro);
            setError("Erro ao carregar dados");
        }
    };

    return (
        <div className='listarLivros'>
            {/* <h1>Listar livros</h1> */}
            <br /><br />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
            
            <div className='TituloListar'>
                <a className='TituloListarLivros' onClick={carregarDados}>LISTAR</a>
                <a className='TituloListarLivros' onClick={carregarDados}>CADASTRAR</a>
            </div>

            <table className="table table-striped table-dark">
                    <thead>
                      <tr>
                        <th className='ID' scope="col">ID</th>
                        <th className='TITULO' scope="col">TITULO</th>
                        <th className='AUTOR' scope="col">AUTOR</th>
                        <th className='ANO' scope="col">ANO PUBLICAÇÃO</th>
                        <th className='QUANTIDADE' scope="col">QUANTIDADE LIVROS</th>
                        <th className='ALTERAR' scope="col">EDITAR</th>
                        <th className='' scope="col">EXCLUIR</th>
                      </tr>
                      
                    </thead>
                    
                    {livros.map((livro) => 
                    <tbody>
                      <tr key={livro.id}>
                        <th scope="row">{livro.id}</th>
                        <td>{livro.titulo}</td>
                        <td>{livro.autor}</td>
                        <td>{livro.anoPublicacao}</td>
                        <td>{livro.quantidadeLivro}</td>
                        
                        <td><img className='imgIcon' src="https://img.icons8.com/?size=100&id=15042&format=png&color=FA5252" alt="" /></td>
                        <td><img className='imgIcon' src="https://img.icons8.com/?size=100&id=99961&format=png&color=FA5252" alt="" /></td>
                      </tr>
                    </tbody>
                    )}
                    </table>
                <br />
            </div>
        </div>
    );
}

export default LivroListar;