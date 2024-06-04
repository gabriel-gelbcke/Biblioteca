import React from 'react';
import logo from './logo.svg';
import LivroListar from './components/pages/livro/livro-listar';
import MenuHorizontal from './components/pages/menu-horizontal';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <MenuHorizontal></MenuHorizontal>
      </BrowserRouter>

      
        <LivroListar></LivroListar>
    </div>
  );
}

export default App;