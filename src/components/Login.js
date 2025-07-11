import { useState } from "react";

function Login({ onLogin }) {
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro(""); // Limpa o erro anterior

        try {
            const res = await fetch("http://vps.plenusti.com.br:61346/cosmos/login", {
                method: "POST",
                // headers: {
                //     "Content-Type": "application/json",
                // },
                body: JSON.stringify({ login, senha }),
            });

            const contentType = res.headers.get("Content-Type");

            if (!contentType || !contentType.includes("application/json")) {
                const text = await res.text();
                console.warn("⚠️ Resposta inesperada do servidor:", text);
                setErro("Resposta inesperada do servidor.");
                return;
            }

            const data = await res.json();
            console.log("🔁 Dados recebidos:", data);

            if (res.ok) {
                const token = data.token || data.access_token;
                if (token) {
                    localStorage.setItem("token", token); // Armazena token localmente
                    onLogin(token); // Chama função recebida por props
                } else {
                    setErro("Nome de usuário ou Senha inválidos.");
                }
            } else {
                setErro(data.message || "Login inválido.");
            }
        } catch (err) {
            console.error("❌ Erro de rede ou fetch:", err);
            setErro("Erro ao conectar com o servidor.");
        }
    };

    return (
        <div
            style={{
                padding: "20px",
                maxWidth: "320px",
                margin: "40px auto",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
        >
            <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#333" }}>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "6px", color: "#555" }}>Usuário:</label>
                    <input
                        type="text"
                        value={login}
                        // placeholder="Usuário"
                        onChange={(e) => setLogin(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            fontSize: "16px",
                            boxSizing: "border-box",
                            outlineColor: "#007bff",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "6px", color: "#555" }}>Senha:</label>
                    <input
                        type="password"
                        value={senha}
                        // placeholder="Senha"
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            fontSize: "16px",
                            boxSizing: "border-box",
                            outlineColor: "#007bff",
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        fontSize: "16px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#0056b3")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#007bff")}
                >
                    Entrar
                </button>
            </form>

            {erro && (
                <p style={{ color: "red", marginTop: "15px", textAlign: "center" }}>{erro}</p>
            )}
        </div>
    );

}

export default Login;
