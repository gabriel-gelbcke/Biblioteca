import React, { useState, useEffect } from 'react';

function MenuHorizontal() {
    return(
    <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand">Biblioteca</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link active" aria-current="page" href="#">Livros</a>
                        <a className="nav-link active" href="#">Usuarios</a>
                        <a className="nav-link active" href="#">Emprestimos</a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
    );
}

export default MenuHorizontal;