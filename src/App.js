import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Cadastrar from "./components/Cadastrar";
import Editar from "./components/Editar";
import Home from "./components/Home";
import Layout from "./components/Layout";
import ListarAdicional from "./components/ListarAdicional";
import ListarContas from "./components/ListarContas";
import ListarProdutos from "./components/ListarProdutos";
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
          <Route path="/listar-produtos" element={<ListarProdutos />} />
          <Route path="/listar-adicional" element={<ListarAdicional />} />
        </Route>

        {/* Qualquer rota não encontrada → redireciona para login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
