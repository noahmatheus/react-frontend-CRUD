import { Link } from "react-router-dom";

function Home() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Home</h1>
            <nav>
                <Link to="/listar">Listar Contas</Link> | <Link to="/cadastrar">Cadastrar Conta</Link> | <Link to="/editar">Editar Conta</Link> | <Link to="/login">Sair</Link>
            </nav>
        </div>
    );
}

export default Home;
