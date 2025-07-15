import dayjs from 'dayjs';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import BotaoVoltar from "../BotaoVoltar";

function Cadastrar() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("https://renderproject-deploy.onrender.com/api/user/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name,
                email,
                pass,
                since: dayjs().format('DD/MM/YYYY HH:mm:ss'),
            }),
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Erro ao cadastrar");
                alert("Conta cadastrada com sucesso!");
                setName("");
                setEmail("");
                setPass("");
            })
            .catch((err) => {
                alert("Erro: " + err.message);
            });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Cadastrar Conta</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Nome:</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc"
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Login:</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc"
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Senha:</label>
                    <input
                        type="password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc"
                        }}
                    />
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            padding: "10px 15px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            flex: 1
                        }}
                    >
                        Cadastrar
                    </button>
                    <button
                        type="button"
                        onClick={() => { navigate(-1); }}
                        style={{
                            backgroundColor: "#6c757d",
                            color: "#fff",
                            padding: "10px 15px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            flex: 1
                        }}
                    >
                        Cancelar
                    </button>
                </div>
            </form>

            <BotaoVoltar />
        </div>
    );
}

export default Cadastrar;
