import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import CadastrarFormularioProduto from "./CadastrarFormularioProduto";
import Cadastrar from "./components/Cadastrar";
import Editar from "./components/Editar";
import Home from "./components/Home";
import Layout from "./components/Layout";
import ListarAdicional from "./components/ListarAdicional";
import ListarCatalogo from "./components/ListarCatalogo";
import ListarContas from "./components/ListarContas";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import SelecionarAgente from "./components/SelecionarAgente";


function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Rota de login (fora do layout) */}
        <Route path="/login" element={<Login onLogin={() => window.location.href = "/"} />} />

        {/* Rotas protegidas com layout fixo */}
        <Route element={<ProtectedRoute token={token}><Layout /></ProtectedRoute>}>
          <Route path="/" element={<Home />} />
          <Route path="/listar" element={<ListarContas />} />
          <Route path="/cadastrar" element={<Cadastrar />} />
          <Route path="/editar" element={<Editar />} />
          <Route path="/selecionar-agente" element={<SelecionarAgente />} />
          {/* <Route path="/listar-produtos" element={<ListarProdutos />} /> */}
          <Route path="/listar-adicional" element={<ListarAdicional />} />
          <Route path="/listar-catalogo" element={<ListarCatalogo />} />
          {/* <Route path="/editar-produto" element={<EditarProduto />} /> */}
          <Route path="/crud-produto" element={<CadastrarFormularioProduto />} />
        </Route>

        {/* Qualquer rota não encontrada → redireciona para login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
