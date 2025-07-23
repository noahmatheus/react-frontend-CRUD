// src/components/Header.js
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

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
                    <Link to="/pedidos" style={linkStyle}>Pedidos</Link>
                    <Link to="/crud-catalogo" style={linkStyle}>Catalogos</Link>
                    <Link to="/crud-produto" style={linkStyle}>Produtos</Link>
                    <Link to="/crud-adicional" style={linkStyle}>Adicionais</Link>
                    <Link to="/crud-horario" style={linkStyle}>Horários</Link>
                    <Link to="/editar" style={linkStyle}>Usuarios</Link>
                </nav>

                {/* Botão de sair alinhado à direita */}
                <div>
                    <button onClick={handleLogout} style={{ ...linkStyle, marginLeft: "40px", color: "#ffcccc", background: "none", border: "none", cursor: "pointer" }}>
                        Sair
                    </button>
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
