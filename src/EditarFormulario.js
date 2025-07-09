import { useState } from "react";

function EditarFormulario({ conta, onCancel, onUpdate }) {
    const [nome, setNome] = useState(conta.nome);
    const [senha, setSenha] = useState("");
    const [login, setLogin] = useState(conta.login);

    const handleSalvar = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`http://vps.plenusti.com.br:61346/cosmos/api/conta/${conta.id_conta}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ nome, senha, login }),
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
        <div style={{ marginTop: "20px" }}>
            <h3>Editando: {conta.nome}</h3>
            <div>
                <label>Nome:</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>
            <div>
                <label>Login:</label>
                <input
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
            </div>
            <div>
                <label>Nova Senha:</label>
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>
            <button onClick={handleSalvar}>Salvar</button>
            <button onClick={onCancel} style={{ marginLeft: "10px" }}>
                Cancelar
            </button>
        </div>
    );
}

export default EditarFormulario;
