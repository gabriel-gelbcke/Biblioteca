import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function UsuarioCadastrar() {

    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const [nome, setNome] = useState<string>(''); 
    const [email, setEmail] = useState<string>(''); 

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'nome') {
            setNome(value);
        } else if (name === 'email') {
            setEmail(value);
        }
    };
    const enviarDados = async () => {
        try {
            const url = `http://localhost:5291/api/usuario/cadastrar`;
            const corpoRequisicao = {
                nome: nome,
                email: email
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
                <Link className='link2' to="/usuarios/listar"><a className='link2'>LISTAR</a></Link>
                <Link className='link1' to="/usuarios/cadastrar"><a className='link1'>CADASTRAR</a></Link>
                <Link className='link1' to="/usuarios/excluir"><a className='link2'>EXCLUIR</a></Link>
                <Link className='link1' to="/usuarios/editar"><a className='link2'>EDITAR</a></Link>
            </div>

            <div className="content-livros">
                <div className="box-livros">
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th className='ID' scope="col">NOME</th>
                                <th className='ID' scope="col">EMAIL</th>
                                <th className='ANO' scope="col">CADASTRAR</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td><input className="form-control" placeholder="Nome" type="text" id="nome" name="nome" value={nome} onChange={handleInputChange} /></td>
                                    <td><input className="form-control" placeholder="Email" type="email" id="email" name="email" value={email} onChange={handleInputChange} /></td>
                                    <td><div className="imgDiv"><img className='imgIcon' src="https://img.icons8.com/?size=100&id=40902&format=png&color=40C057" onClick={enviarDados} /></div></td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UsuarioCadastrar;
