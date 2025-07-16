import { Route, HashRouter as Router, Routes } from "react-router-dom";

import Cadastrar from "./components/Cadastrar";
import Editar from "./components/Editar";
import EditarAdicional from "./components/EditarAdicional";
import EditarCatalogo from "./components/EditarCatalogo";
import EditarProduto from "./components/EditarProduto";
import Home from "./components/Home";
import Layout from "./components/Layout";
import ListarContas from "./components/ListarContas";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";


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
          <Route path="/crud-catalogo" element={<EditarCatalogo />} />
          <Route path="/crud-produto" element={<EditarProduto />} />
          <Route path="/crud-adicional" element={<EditarAdicional />} />
        </Route>

        {/* Qualquer rota não encontrada → redireciona para login */}
        <Route path="/login" element={<Login onLogin={() => window.location.href = "/#/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
