import LivroCadastrar from './components/pages/livro/livro-cadastrar';
import LivroEditar from './components/pages/livro/livro-editar';
import LivroExcluir from './components/pages/livro/livro-excluir';
import LivroListar from './components/pages/livro/livro-listar';

import UsuarioCadastrar from './components/pages/usuario/usuario-cadastrar';
import UsuarioEditar from './components/pages/usuario/usuario-editar';
import UsuarioExcluir from './components/pages/usuario/usuario-excluir';
import UsuarioListar from './components/pages/usuario/usuario-listar';

import EmprestimoCadastrar from './components/pages/emprestimo/emprestimo-cadastrar';
import EmprestimoExcluir from './components/pages/emprestimo/emprestimo-excluir';
import EmprestimoListar from './components/pages/emprestimo/emprestimo-listar';

import MenuHorizontal from './components/pages/menu-horizontal';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <MenuHorizontal></MenuHorizontal>
      <Routes>
        <Route path="/livros/cadastrar" element={<LivroCadastrar />} />
        <Route path="/livros/editar" element={<LivroEditar />} />
        <Route path="/livros/excluir" element={<LivroExcluir />} />
        <Route path="/livros/listar" element={<LivroListar />} />

        <Route path="/usuarios/cadastrar" element={<UsuarioCadastrar />} />
        <Route path="/usuarios/editar" element={<UsuarioEditar />} />
        <Route path="/usuarios/excluir" element={<UsuarioExcluir />} />
        <Route path="/usuarios/listar" element={<UsuarioListar />} />

        <Route path="/emprestimos/cadastrar" element={<EmprestimoCadastrar />} />
        <Route path="/emprestimos/excluir" element={<EmprestimoExcluir />} />
        <Route path="/emprestimos/listar" element={<EmprestimoListar />} />

        <Route path="*" element={<Navigate to="/livros/listar" replace />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;