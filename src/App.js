import { Route, HashRouter as Router, Routes } from "react-router-dom";

import Editar from "./components/Editar";
import EditarAdicional from "./components/EditarAdicional";
import EditarCatalogo from "./components/EditarCatalogo";
import EditarConfiguracao from "./components/EditarConfiguracao";
import EditarHorario from "./components/EditarHorario";
import EditarProduto from "./components/EditarProduto";
import Home from "./components/Home";
import Layout from "./components/Layout";
import ListarPedidos from "./components/ListarPedidos";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Rota de login (fora do layout) */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas com layout fixo */}
        <Route element={<ProtectedRoute token={token}><Layout /></ProtectedRoute>}>
          <Route path="/" element={<Home />} />
          <Route path="/crud-catalogo" element={<EditarCatalogo />} />
          <Route path="/crud-produto" element={<EditarProduto />} />
          <Route path="/crud-adicional" element={<EditarAdicional />} />
          <Route path="/crud-horario" element={<EditarHorario />} />
          <Route path="/editar" element={<Editar />} />
          <Route path="/pedidos" element={<ListarPedidos />} />
          <Route path="/configuracao" element={<EditarConfiguracao />} />
        </Route>

        {/* Qualquer rota não encontrada → redireciona para login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
