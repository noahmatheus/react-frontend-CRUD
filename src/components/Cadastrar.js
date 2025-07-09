import { useState } from "react";

function Cadastrar() {
    const [nome, setNome] = useState("");
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");

    const token = localStorage.getItem("token");

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://vps.plenusti.com.br:61346/cosmos/api/conta/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                nome,
                login,
                senha,
            }),
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Erro ao cadastrar");
                alert("Conta cadastrada com sucesso!");
                setNome("");
                setLogin("");
                setSenha("");
            })
            .catch((err) => {
                alert("Erro: " + err.message);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome:</label>
                <input value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>
            <div>
                <label>Login:</label>
                <input value={login} onChange={(e) => setLogin(e.target.value)} required />
            </div>
            <div>
                <label>Senha:</label>
                <input value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </div>
            <button type="submit">Cadastrar</button>
        </form>
    );
}

export default Cadastrar;
