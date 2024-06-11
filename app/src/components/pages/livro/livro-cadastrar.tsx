import React, { useState, useEffect } from 'react';
import { Livro } from '../../../Models/Livro';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function LivroCadastrar() {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [id, setId] = useState<string>(''); // Estado para armazenar o id
    const [nome, setNome] = useState<string>(''); // Estado para armazenar o nome
    const [email, setEmail] = useState<string>(''); // Estado para armazenar o email

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'nome') {
            setNome(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'id') {
            setId(value);
        } 
    };

    const enviarDados = async () => {
        try {
            // const id = 'coloqueAquiSeuId'; // Substitua 'coloqueAquiSeuId' pelo ID do usuário que deseja alterar
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

            console.log('Dados enviados com sucesso!');
            // Aqui você pode adicionar lógica adicional, como atualizar o estado após o envio bem-sucedido
        } catch (erro) {
            console.error("Erro ao enviar dados:", erro);
            setError("Erro ao enviar dados");
        }
    };

    return (
        <div className='listarLivros'>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <div className='TituloListar'>
                <Link className='link2' to="/livros/listar"><a className='link2' onClick={carregarDados}>LISTAR</a></Link>
                <Link className='link1' to="/livros/cadastrar"><a className='link1' onClick={carregarDados}>CADASTRAR</a></Link>
            </div>

            <div className="content-livros">
                <div className="box-livros">
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th className='ID' scope="col">ID</th>
                                <th className='ID' scope="col">NOME</th>
                                <th className='TITULO' scope="col">EMAIL</th>
                                <th className='ALTERAR' scope="col">CONFIRMAR</th>
                            </tr>
                        </thead>
                        <tbody>

                                <tr>
                                    <td><input placeholder="id" type="text" id="id" name="id" value={id} onChange={handleInputChange} /></td>
                                    <td><input placeholder="nome" type="text" id="nome" name="nome" value={nome} onChange={handleInputChange} /></td>
                                    <td><input placeholder="email" type="text" id="email" name="email" value={email} onChange={handleInputChange} /></td>
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
