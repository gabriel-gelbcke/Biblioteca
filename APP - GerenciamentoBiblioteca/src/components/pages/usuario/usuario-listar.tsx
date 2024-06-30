import React, { useState, useEffect } from 'react';
import { Usuario } from '../../../Models/Usuario';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function UsuarioListar() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const resposta = await fetch("http://localhost:5291/api/usuarios/listar");
            if (!resposta.ok) {
                throw new Error('Erro na resposta da API');
            }
            const dados = await resposta.json();
            setUsuarios(dados);
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
                <Link className='link1' to="/usuarios/listar"><a className='link1'>LISTAR</a></Link>
                <Link className='link2' to="/usuarios/cadastrar"><a className='link2'>CADASTRAR</a></Link>
                <Link className='link1' to="/usuarios/excluir"><a className='link2'>EXCLUIR</a></Link>
                <Link className='link1' to="/usuarios/editar"><a className='link2'>EDITAR</a></Link>
            </div>

            <div className="content-livros">
                <div className="box-livros">
            <table className="table table-striped table-dark">
                    <thead>
                      <tr>
                        <th className='ANO' scope="col">ID</th>
                        <th className='ANO' scope="col">NOME</th>
                        <th className='ANO' scope="col">EMAIL</th>
                      </tr>
                    </thead>
                    
                    {usuarios.slice().reverse().map((usuario) => 
                    <tbody>
                      <tr key={usuario.id}>
                        <th scope="row">{usuario.id}</th>
                        <td>{usuario.nome}</td>
                        <td>{usuario.email}</td>
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

export default UsuarioListar;