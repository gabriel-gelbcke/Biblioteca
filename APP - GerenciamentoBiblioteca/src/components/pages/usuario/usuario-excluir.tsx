import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function UsuarioExcluir() {

    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [id, setId] = useState<string>(''); 

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'id') {
            setId(value);
        }
    };

    const excluirDados = async () => {
        try {
            const url = `http://localhost:5291/api/emprestimo/deletar/${id}`;
            const resposta = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!resposta.ok) {
                throw new Error('Erro ao excluir dados');
            }

            setMessage('Dados excluidos com sucesso!');
            setError(null);
            console.log('Dados excluidos com sucesso!');
        } catch (erro) {
            console.error("Erro ao excluir dados:", erro);
            setError("Erro ao excluir dados");
            setMessage(null);
        }
    };

    return (
        <div className='listarLivros'>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <a style={{ color: 'green' }}>{message}</a>}
            
            <div className='TituloListar'>
                <Link className='link2' to="/usuarios/listar"><a className='link2'>LISTAR</a></Link>
                <Link className='link1' to="/usuarios/cadastrar"><a className='link2'>CADASTRAR</a></Link>
                <Link className='link1' to="/usuarios/excluir"><a className='link1'>EXCLUIR</a></Link>
                <Link className='link1' to="/usuarios/editar"><a className='link2'>EDITAR</a></Link>
            </div>

            <div className="content-livros">
                <div className="box-livros">
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th className='ID' scope="col">ID</th>
                                <th className='ANO' scope="col">EXCLUIR</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td><input className="form-control" placeholder="Id do emprestimo para excluir" type="text" id="id" name="id" value={id} onChange={handleInputChange} /></td>
                                    <td><div className="imgDiv"><img className='imgIcon' src="https://img.icons8.com/?size=100&id=99961&format=png&color=FA5252" onClick={excluirDados} /></div></td>
                                </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UsuarioExcluir;
