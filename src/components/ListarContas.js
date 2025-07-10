import { useEffect, useState } from "react";
import BotaoVoltar from "../BotaoVoltar";

function ListarContas({ onEditar, onExcluir }) {
    const [contas, setContas] = useState([]);
    const [erro, setErro] = useState("");

    const carregarContas = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://vps.plenusti.com.br:61346/cosmos/api/conta/", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao carregar contas");
            }

            const data = await response.json();
            setContas(data);
        } catch (err) {
            setErro("Erro ao carregar contas");
        }
    };

    useEffect(() => {
        carregarContas();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Lista de Contas</h2>
            {erro && <p style={{ color: "red" }}>{erro}</p>}

            <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ backgroundColor: "#f2f2f2" }}>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Login</th>
                    </tr>
                </thead>
                <tbody>
                    {contas.map(({ id_conta, nome, login }) => (
                        <tr key={id_conta}>
                            <td>{id_conta}</td>
                            <td>{nome}</td>
                            <td>{login}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <BotaoVoltar />
        </div>
    );
}

export default ListarContas;
