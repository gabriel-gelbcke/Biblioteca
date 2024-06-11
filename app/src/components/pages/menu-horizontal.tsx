import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import LivroListar from './livro/livro-listar';
import LivroCadastrar from './livro/livro-cadastrar';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';

import iconBiblioteca from '../images/icon-biblioteca.png';

function MenuHorizontal() {
    return(
    <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand"><img height="50px" src={iconBiblioteca} alt="" /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className='link1' to="/livros/listar"><a className="nav-link active" aria-current="page" href="#">Livros</a></Link>
                        <Link className='link1' to="/livros/cadastrar"><a className="nav-link active" href="#">Usuarios</a></Link>
                        <Link className='link1' to="/livros/cadastrar"><a className="nav-link active" href="#">Emprestimos</a></Link>
                    </div>
                </div>
            </div>
        </nav>
    </div>
    
    );
}

export default MenuHorizontal;