// src/components/Header.js
import { FaBoxes, FaBoxOpen, FaClipboardList, FaClock, FaCog, FaPlusCircle, FaUsers } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header style={{
            background: "linear-gradient(135deg, #6c757d 0%, #495057 100%)",
            padding: "0 20px",
            height: "70px",
            maxWidth: "100%",
            margin: "0 auto",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            position: "sticky",
            top: 0,
            zIndex: 1000
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",
                maxWidth: "1200px",
                margin: "0 auto"
            }}>
                <nav style={{ display: "flex", gap: 18 }}>
                    <Link to="/pedidos" style={navLinkStyle}>
                        <FaClipboardList style={iconStyle}/>Pedidos
                    </Link>
                    <Link to="/crud-catalogo" style={navLinkStyle}>
                        <FaBoxes style={iconStyle}/>Catálogos
                    </Link>
                    <Link to="/crud-produto" style={navLinkStyle}>
                        <FaBoxOpen style={iconStyle}/>Produtos
                    </Link>
                    <Link to="/crud-adicional" style={navLinkStyle}>
                        <FaPlusCircle style={iconStyle}/>Adicionais
                    </Link>
                    <Link to="/crud-horario" style={navLinkStyle}>
                        <FaClock style={iconStyle}/>Horários
                    </Link>
                    <Link to="/crud-conta" style={navLinkStyle}>
                        <FaUsers style={iconStyle}/>Contas
                    </Link>
                    <Link to="/configuracao" style={navLinkStyle}>
                        <FaCog style={iconStyle}/>Configuração
                    </Link>
                </nav>
                <button onClick={handleLogout} style={logoutButtonStyle}>
                    Sair
                </button>
            </div>
        </header>
    );
}

const navLinkStyle = {
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "14px",
    letterSpacing: "0.5px",
    padding: "8px 16px",
    borderBottom: "2px solid transparent",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)"
};

const iconStyle = {
    fontSize: "16px",
    color: "#ffffff"
};

const logoutButtonStyle = {
    backgroundColor: "#dc3545",
    color: "#ffffff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(220, 53, 69, 0.3)",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)"
};
