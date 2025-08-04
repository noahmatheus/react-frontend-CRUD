import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");

        try {
            const res = await fetch("https://renderproject-deploy.onrender.com/login", {
                method: "POST",
                body: JSON.stringify({ email, pass }),
            });

            const data = await res.json();

            if (res.ok) {
                const token = data.token || data.access_token;
                if (token) {
                    localStorage.setItem("token", token);
                    navigate("/");
                } else {
                    setErro("Nome de usuário ou Senha inválidos.");
                }
            } else {
                setErro(data.message || "Nome de usuário ou Senha inválidos.");
            }
        } catch (err) {
            console.error("Erro no login:", err);
            setErro("Erro de conexão. Tente novamente.");
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #6c757d 0%, #495057 100%)",
            fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif"
        }}>
            <div style={{
                background: "rgba(255, 255, 255, 0.95)",
                padding: "40px",
                borderRadius: "20px",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                width: "100%",
                maxWidth: "400px",
                margin: "20px"
            }}>
                <div style={{
                    textAlign: "center",
                    marginBottom: "30px"
                }}>
                    <h1 style={{
                        color: "#333",
                        fontSize: "28px",
                        fontWeight: "600",
                        margin: "0 0 10px 0"
                    }}>
                        📋 Painel
                    </h1>
                    <p style={{
                        color: "#666",
                        fontSize: "14px",
                        margin: "0"
                    }}>
                        Faça login para continuar
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div>
                        <label style={{
                            display: "block",
                            marginBottom: "8px",
                            color: "#333",
                            fontSize: "14px",
                            fontWeight: "500"
                        }}>
                            Email:
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "12px 16px",
                                borderRadius: "10px",
                                border: "2px solid #e1e5e9",
                                fontSize: "14px",
                                transition: "all 0.3s ease",
                                boxSizing: "border-box"
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = "#6c757d";
                                e.target.style.boxShadow = "0 0 0 3px rgba(108, 117, 125, 0.1)";
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "#e1e5e9";
                                e.target.style.boxShadow = "none";
                            }}
                            placeholder="Digite seu email"
                        />
                    </div>

                    <div>
                        <label style={{
                            display: "block",
                            marginBottom: "8px",
                            color: "#333",
                            fontSize: "14px",
                            fontWeight: "500"
                        }}>
                            Senha:
                        </label>
                        <input
                            type="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "12px 16px",
                                borderRadius: "10px",
                                border: "2px solid #e1e5e9",
                                fontSize: "14px",
                                transition: "all 0.3s ease",
                                boxSizing: "border-box"
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = "#6c757d";
                                e.target.style.boxShadow = "0 0 0 3px rgba(108, 117, 125, 0.1)";
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "#e1e5e9";
                                e.target.style.boxShadow = "none";
                            }}
                            placeholder="Digite sua senha"
                        />
                    </div>

                    {erro && (
                        <div style={{
                            background: "#fee",
                            color: "#c33",
                            padding: "12px",
                            borderRadius: "8px",
                            fontSize: "14px",
                            border: "1px solid #fcc"
                        }}>
                            {erro}
                        </div>
                    )}

                    <button
                        type="submit"
                        style={{
                            background: "linear-gradient(135deg, #6c757d 0%, #495057 100%)",
                            color: "white",
                            padding: "14px",
                            border: "none",
                            borderRadius: "10px",
                            fontSize: "16px",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 15px rgba(108, 117, 125, 0.3)"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = "translateY(-2px)";
                            e.target.style.boxShadow = "0 6px 20px rgba(108, 117, 125, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow = "0 4px 15px rgba(108, 117, 125, 0.3)";
                        }}
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
