import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Cadastrar from "./components/Cadastrar";
import Editar from "./components/Editar";
import Home from "./components/Home";
import ListarContas from "./components/ListarContas";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => window.location.href = "/"} />} />
        <Route path="/" element={<ProtectedRoute token={token}><Home /></ProtectedRoute>} />
        <Route path="/listar" element={<ProtectedRoute token={token}><ListarContas /></ProtectedRoute>} />
        <Route path="/cadastrar" element={<ProtectedRoute token={token}><Cadastrar /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/editar" element={<ProtectedRoute token={token}><Editar /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
