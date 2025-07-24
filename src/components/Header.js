// src/components/Header.js
import { FaBoxes, FaBoxOpen, FaClipboardList, FaClock, FaPlusCircle, FaUsers } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header style={{
            background: "#18181b", // preto escuro estilo OpenAI
            color: "white",
            padding: 0,
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: 56,
                maxWidth: 1200,
                margin: "0 auto",
                padding: "0 24px"
            }}>
                {/* Menu da esquerda */}
                <nav style={{ display: "flex", gap: 18 }}>
                    <Link to="/pedidos" style={navLinkStyle}><FaClipboardList style={iconStyle}/>Pedidos</Link>
                    <Link to="/crud-catalogo" style={navLinkStyle}><FaBoxes style={iconStyle}/>Catálogos</Link>
                    <Link to="/crud-produto" style={navLinkStyle}><FaBoxOpen style={iconStyle}/>Produtos</Link>
                    <Link to="/crud-adicional" style={navLinkStyle}><FaPlusCircle style={iconStyle}/>Adicionais</Link>
                    <Link to="/crud-horario" style={navLinkStyle}><FaClock style={iconStyle}/>Horários</Link>
                    <Link to="/editar" style={navLinkStyle}><FaUsers style={iconStyle}/>Usuários</Link>
                </nav>
                {/* Botão de sair alinhado à direita */}
                <button
                    onClick={handleLogout}
                    style={logoutButtonStyle}
                >
                    Sair
                </button>
            </div>
        </header>
    );
}

const navLinkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 15,
    letterSpacing: 0.2,
    padding: "6px 0",
    borderBottom: "2px solid transparent",
    transition: "border 0.2s, color 0.2s",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 7
};

const iconStyle = {
    marginRight: 2,
    fontSize: 16
};

const logoutButtonStyle = {
    background: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "8px 22px",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(229, 57, 53, 0.10)",
    transition: "background 0.2s, box-shadow 0.2s",
    marginLeft: 32,
    outline: "none"
};
