import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import BotaoVoltar from "./BotaoVoltar";

function CadastrarFormularioCatalogo() {
    const [nome, setNome] = useState("");

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("https://renderproject-deploy.onrender.com/api/catalogo/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                nome,
                valor,
                catalogo_temp: 1,
                // fix arrumar depois
            }),
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Erro ao cadastrar");
                alert("Catalogo cadastrado com sucesso!");
                setNome("");
                setValor("");
            })
            .catch((err) => {
                alert("Erro: " + err.message);
            });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Cadastrar Catalogo</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Nome:</label>
                    <input
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
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

export default CadastrarFormularioCatalogo;
