import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function LivroCadastrar() {

    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const [titulo, setTitulo] = useState<string>(''); 
    const [autor, setAutor] = useState<string>(''); 
    const [ano, setAno] = useState<string>(''); 
    const [qtd, setQtd] = useState<string>(''); 

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'titulo') {
            setTitulo(value);
        } else if (name === 'autor') {
            setAutor(value);
        } else if (name === 'ano') {
            setAno(value);
        } else if (name === 'qtd') {
            setQtd(value);
        }
    };
    
    const enviarDados = async () => {
        try {
            const url = `http://localhost:5291/api/livro/cadastrar`;
            const corpoRequisicao = {
                titulo: titulo,
                quantidadelivro: qtd,
                autor: autor,
                anopublicacao: ano
            };
            const resposta = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(corpoRequisicao)
            });

            if (!resposta.ok) {
                throw new Error('Erro ao enviar dados');
            }

            setMessage('Dados enviados com sucesso!');
            setError(null);
            console.log('Dados enviados com sucesso!');
        } catch (erro) {
            console.error("Erro ao enviar dados:", erro);
            setError("Erro ao enviar dados!");
            setMessage(null);
        }
    };

    return (
        <div className='listarLivros'>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <a style={{ color: 'green' }}>{message}</a>}
            
            <div className='TituloListar'>
                <Link className='link2' to="/livros/listar"><a className='link2'>LISTAR</a></Link>
                <Link className='link1' to="/livros/cadastrar"><a className='link1'>CADASTRAR</a></Link>
                <Link className='link1' to="/livros/excluir"><a className='link2'>EXCLUIR</a></Link>
                <Link className='link1' to="/livros/editar"><a className='link2'>EDITAR</a></Link>
            </div>

            <div className="content-livros">
                <div className="box-livros">
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th className='ID' scope="col">TITULO</th>
                                <th className='ID' scope="col">AUTOR</th>
                                <th className='ID' scope="col">ANO</th>
                                <th className='ID' scope="col">QUANTIDADE</th>
                                <th className='ANO' scope="col">CADASTRAR</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td><input className="form-control" placeholder="Titulo" type="text" id="titulo" name="titulo" value={titulo} onChange={handleInputChange} /></td>
                                    <td><input className="form-control" placeholder="Autor" type="text" id="autor" name="autor" value={autor} onChange={handleInputChange} /></td>
                                    <td><input className="form-control" placeholder="Ano" type="text" id="ano" name="ano" value={ano} onChange={handleInputChange} /></td>
                                    <td><input className="form-control" placeholder="Quantidade" type="text" id="qtd" name="qtd" value={qtd} onChange={handleInputChange} /></td>
                                    <td><div className="imgDiv"><img className='imgIcon' src="https://img.icons8.com/?size=100&id=40902&format=png&color=40C057" onClick={enviarDados} /></div></td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default LivroCadastrar;
