// src/components/Header.js
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header style={{
            backgroundColor: "#333",
            color: "white",
            padding: "15px 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                {/* Menu da esquerda */}
                <nav>
                    <Link to="/listar" style={linkStyle}>Listar Contas</Link>
                    <Link to="/cadastrar" style={linkStyle}>Cadastrar Conta</Link>
                    <Link to="/editar" style={linkStyle}>Editar Conta</Link>
                    <Link to="/selecionar-agente" style={linkStyle}>Treinar Agente</Link>
                    {/* <Link to="/listar-catalogo" style={linkStyle}>Listar Catalogo</Link> */}
                    {/* <Link to="/listar-produtos" style={linkStyle}>Listar Produtos</Link> */}
                    {/* <Link to="/listar-adicional" style={linkStyle}>Listar Adicional</Link> */}
                    {/* <Link to="/editar-produto" style={linkStyle}>Editar Produto</Link> */}
                    <Link to="/crud-catalogo" style={linkStyle}>Catalogos</Link>
                    <Link to="/crud-produto" style={linkStyle}>Produtos</Link>
                    <Link to="/crud-adicional" style={linkStyle}>Adicionais</Link>
                </nav>

                {/* Botão de sair alinhado à direita */}
                <div>
                    <Link to="/login" style={{ ...linkStyle, marginLeft: "40px", color: "#ffcccc" }}>Sair</Link>
                </div>
            </div>
        </header>
    );
}

const linkStyle = {
    color: "white",
    textDecoration: "none",
    marginLeft: "20px"
};