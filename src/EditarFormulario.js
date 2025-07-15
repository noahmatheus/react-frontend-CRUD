import dayjs from 'dayjs';
import { useState } from "react";

function EditarFormulario({ conta, onCancel, onUpdate }) {
    const [name, setName] = useState(conta.name);
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState(conta.email);
    // const [since, setEmail] = useState(conta.email);

    const handleSalvar = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`https://renderproject-deploy.onrender.com/api/user/${conta.id_user}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name, pass, email, since: dayjs().format('DD/MM/YYYY HH:mm:ss') }),
            });

            if (res.ok) {
                alert("Conta atualizada com sucesso!");
                onUpdate();
            } else {
                const erro = await res.json();
                alert("Erro ao atualizar: " + (erro.message || "Erro desconhecido"));
            }
        } catch (err) {
            console.error("Erro ao atualizar conta:", err);
            alert("Erro de conexão.");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "20px auto" }}>
            <h3 style={{ marginBottom: "20px" }}>Editando: {conta.name}</h3>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Nome:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc"
                    }}
                />
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Nova Senha:</label>
                <input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc"
                    }}
                />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
                <button
                    onClick={handleSalvar}
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
                    Salvar
                </button>
                <button
                    onClick={onCancel}
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
        </div>
    );

}

export default EditarFormulario;
