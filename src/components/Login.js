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
                    setErro("Token não encontrado na resposta.");
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
        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuário:</label>
                    <input
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginTop: "10px" }}>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={{ marginTop: "15px" }}>Entrar</button>
            </form>

            {erro && <p style={{ color: "red", marginTop: "10px" }}>{erro}</p>}
        </div>
    );
}

export default Login;
