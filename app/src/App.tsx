import React from 'react';
import logo from './logo.svg';
import LivroListar from './components/pages/livro/livro-listar';
import LivroCadastrar from './components/pages/livro/livro-cadastrar';
import MenuHorizontal from './components/pages/menu-horizontal';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">

      
        <MenuHorizontal></MenuHorizontal>
        {/* <LivroListar></LivroListar> */}
        {/* <LivroCadastrar></LivroCadastrar> */}
      
      <Routes>
        <Route path="/livros/listar" element={<LivroListar />} />
        <Route path="/livros/cadastrar" element={<LivroCadastrar />} />

        <Route path="/usuarios/listar" element={<LivroListar />} />
        <Route path="/usuarios/cadastrar" element={<LivroCadastrar />} />

        <Route path="/emprestimos/listar" element={<LivroListar />} />
        <Route path="/emprestimos/cadastrar" element={<LivroCadastrar />} />

        <Route path="*" element={<Navigate to="/livros/listar" replace />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;