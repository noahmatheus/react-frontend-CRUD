import { Link } from "react-router-dom";
import Cadastrar from "./components/Cadastrar";

function CadastrarConta({ onLogout }) {
    return (
        <div style={{ padding: "20px" }}>
            <h2>Cadastrar Conta</h2>
            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/listar">Listar Contas</Link> |{" "}
                <button onClick={onLogout}>Sair</button>
            </nav>
            <Cadastrar />
        </div>
    );
}

export default CadastrarConta;
