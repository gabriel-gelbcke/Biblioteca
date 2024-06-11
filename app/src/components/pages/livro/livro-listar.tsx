import React, { useState, useEffect } from 'react';
import { Livro } from '../../../Models/Livro';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function LivroListar() {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("Executar algo ao carregar o componente...");
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
            console.error("Deu erro!", erro);
            setError("Erro ao carregar dados");
        }
    };

    return (
        <div className='listarLivros'>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
            
            <div className='TituloListar'>
                <Link className='link1' to="/livros/listar"><a className='link1' onClick={carregarDados}>LISTAR</a></Link>
                <Link className='link2' to="/livros/cadastrar"><a className='link2' onClick={carregarDados}>CADASTRAR</a></Link>
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
                        
                        <td><div className="imgDiv"><img className='imgIcon' src="https://img.icons8.com/?size=100&id=15042&format=png&color=FA5252" alt="" /></div></td>
                        <td><div className="imgDiv"><img className='imgIcon' src="https://img.icons8.com/?size=100&id=99961&format=png&color=FA5252" alt="" /></div></td>
                      </tr>
                    </tbody>
                    )}
                    </table>

                    


<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

                    </div>

                    </div>
                
            </div>
        </div>
    );
}

export default LivroListar;