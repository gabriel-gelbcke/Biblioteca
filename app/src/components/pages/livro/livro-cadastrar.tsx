import React, { useState, useEffect } from 'react';
import { Livro } from '../../../Models/Livro';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function LivroCadastrar() {

    //DEFINE AS VARIAVEIS E O SET DELAS
    const [livros, setLivros] = useState<Livro[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const [titulo, setTitulo] = useState<string>(''); 
    const [autor, setAutor] = useState<string>(''); 
    const [ano, setAno] = useState<string>(''); 
    const [qtd, setQtd] = useState<string>(''); 
    const [id, setId] = useState<string>(''); 

    //RODA ALTOMATICO QUANDO COMEÇA A PAGINA
    useEffect(() => {
        console.log("Executar algo ao carregar o componente...");
        carregarDados();
    }, []);

    ////QUANDO EXECUTADO ESSA FUNÇÃO, PEGA A VARIAVEL DO INPUT E TRANSFORMA NA VARIAVEL QUE TU DEFINIU ALI A CIMA
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
        } else if (name === 'id') {
            setId(value);
        }
    };

    ////QUANDO EXECUTADO ESSA FUNÇÃO, LISTA OS DADOS DESSA API
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

    ////QUANDO EXECUTADO ESSA FUNÇÃO, CADASTRA UM NOVO OBJETO, ATRAVÉS DO CORPO DO JSON USANDO AS VARIAVEIS QUE TU DEFINIU ALI A CIMA
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
            console.log('Dados enviados com sucesso!');
        } catch (erro) {
            console.error("Erro ao enviar dados:", erro);
            setError("Erro ao enviar dados");
        }
    };

    ////QUANDO EXECUTADO ESSA FUNÇÃO, EDITA UM OBJETO ATRAVÉS DO ID QUE TU DEFINIU ALI A CIMA
    const editarDados = async () => {
        try {
            const url = `http://localhost:5291/api/livro/alterar/${id}`;
            const corpoRequisicao = {
                titulo: titulo,
                quantidadelivro: qtd,
                autor: autor,
                anopublicacao: ano
            };
            const resposta = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(corpoRequisicao)
            });

            if (!resposta.ok) {
                throw new Error('Erro ao editar dados');
            }

            setMessage('Dados editados com sucesso!');
            console.log('Dados editados com sucesso!');
        } catch (erro) {
            console.error("Erro ao editar dados:", erro);
            setError("Erro ao editar dados");
        }
    };

    ////QUANDO EXECUTADO ESSA FUNÇÃO, EXCLUI UM OBJETO ATRAVÉS DO ID QUE TU DEFINIU ALI A CIMA
    const excluirDados = async () => {
        try {
            const url = `http://localhost:5291/api/livro/deletar/${id}`;
            const resposta = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!resposta.ok) {
                throw new Error('Erro ao editar dados');
            }

            setMessage('Dados excluidos com sucesso!');
            console.log('Dados excluidos com sucesso!');
        } catch (erro) {
            console.error("Erro ao excluir dados:", erro);
            setError("Erro ao excluir dados");
        }
    };

    //// RETORNA EM HTML A PÁGINA, USANDO AS FUNÇÕES E VARIAVEIS QUE TU DEFINIU A CIMA
    // return(
    //     <div>
    //         <br /><br /><br /><br /><br />
    //         <td><input placeholder="id" type="text" id="id" name="id" value={id} onChange={handleInputChange} /></td>
    //         {/* <div className="imgDiv"> */}
    //             <img className='imgIcon' src="https://img.icons8.com/?size=100&id=40902&format=png&color=40C057" onClick={excluirDados} />
    //             {/* </div> */}
    //     </div>
    // )

    return (
        <div className='listarLivros'>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <a style={{ color: 'green' }}>{message}</a>}
            
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
                                <th className='ID' scope="col">TITULO</th>
                                <th className='TITULO' scope="col">AUTOR</th>
                                <th className='ALTERAR' scope="col">ANO</th>
                                <th className='ALTERAR' scope="col">QTD</th>
                            </tr>
                        </thead>
                        <tbody>

                                <tr>
                                    <td><input placeholder="id" type="text" id="id" name="id" value={id} onChange={handleInputChange} /></td>
                                    {/* <td><input placeholder="titulo" type="text" id="titulo" name="titulo" value={titulo} onChange={handleInputChange} /></td>
                                    <td><input placeholder="autor" type="text" id="autor" name="autor" value={autor} onChange={handleInputChange} /></td>
                                    <td><input placeholder="ano" type="text" id="ano" name="ano" value={ano} onChange={handleInputChange} /></td>
                                    <td><input placeholder="qtd" type="text" id="qtd" name="qtd" value={qtd} onChange={handleInputChange} /></td> */}
                                    <td><div className="imgDiv"><img className='imgIcon' src="https://img.icons8.com/?size=100&id=40902&format=png&color=40C057" onClick={excluirDados} /></div></td>
                                </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default LivroCadastrar;
