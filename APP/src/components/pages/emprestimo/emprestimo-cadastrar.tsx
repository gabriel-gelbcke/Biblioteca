import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function EmprestimoCadastrar() {

    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const [livroId, setLivroId] = useState<string>('');
    const [usuarioId, setusuarioId] = useState<string>('');
    const [dataEmprestimo, setdataEmprestimo] = useState<string>('');
    const [dataDevolucao, setdataDevolucao] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'livroId') {
            setLivroId(value);
        } else if (name === 'usuarioId') {
            setusuarioId(value);
        } else if (name === 'dataEmprestimo') {
            setdataEmprestimo(value);
        } else if (name === 'dataDevolucao') {
            setdataDevolucao(value);
        }
    };
    const enviarDados = async () => {
        try {
            const url = `http://localhost:5291/api/emprestimo/cadastrar`;
            const corpoRequisicao = {
                livroId: livroId,
                usuarioId: usuarioId,
                dataemprestimo: dataEmprestimo,
                datadevolucao: dataDevolucao
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
                <Link className='link2' to="/emprestimos/listar"><a className='link2'>LISTAR</a></Link>
                <Link className='link1' to="/emprestimos/cadastrar"><a className='link1'>CADASTRAR</a></Link>
                <Link className='link1' to="/emprestimos/excluir"><a className='link2'>EXCLUIR</a></Link>
            </div>

            <div className="content-livros">
                <div className="box-livros">
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th className='ID' scope="col">LIVRO ID</th>
                                <th className='ID' scope="col">USUARIO ID</th>
                                <th className='ANO' scope="col">DATA EMPRESTIMO</th>
                                <th className='ANO' scope="col">DATA DEVOLUÇÃO</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td><input className="form-control" placeholder="Livro ID" type="text" id="livroId" name="livroId" value={livroId} onChange={handleInputChange} /></td>
                                    <td><input className="form-control" placeholder="Usuario ID" type="email" id="usuarioId" name="usuarioId" value={usuarioId} onChange={handleInputChange} /></td>
                                    <td><input className="form-control" placeholder="Livro ID" type="date" id="dataEmprestimo" name="dataEmprestimo" value={dataEmprestimo} onChange={handleInputChange} /></td>
                                    <td><input className="form-control" placeholder="Usuario ID" type="date" id="dataDevolucao" name="dataDevolucao" value={dataDevolucao} onChange={handleInputChange} /></td>
                                    <td><div className="imgDiv"><img className='imgIcon' src="https://img.icons8.com/?size=100&id=40902&format=png&color=40C057" onClick={enviarDados} /></div></td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EmprestimoCadastrar;
