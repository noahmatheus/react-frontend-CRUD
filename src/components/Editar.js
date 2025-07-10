import { useCallback, useEffect, useState } from "react";
import BotaoVoltar from "../BotaoVoltar";
import EditarFormulario from "../EditarFormulario";
import ExcluirFormulario from "../ExcluirFormulario";

function Editar() {
    const [contas, setContas] = useState([]);
    const [contaSelecionada, setContaSelecionada] = useState(null);
    const [modo, setModo] = useState(null); // "editar" ou "excluir"
    const [erro, setErro] = useState("");

    const carregarContas = useCallback(() => {
        const token = localStorage.getItem("token");

        fetch("http://vps.plenusti.com.br:61346/cosmos/api/conta/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Erro ao carregar contas");
                }
                return res.json();
            })
            .then(data => setContas(data))
            .catch(() => setErro("Erro ao carregar contas"));
    }, []);

    useEffect(() => {
        carregarContas();
    }, [carregarContas]);

    const selecionarParaEditar = (conta) => {
        setContaSelecionada(conta);
        setModo("editar");
    };

    const selecionarParaExcluir = (conta) => {
        setContaSelecionada(conta);
        setModo("excluir");
    };

    const cancelar = () => {
        setContaSelecionada(null);
        setModo(null);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Editar/Excluir Contas</h2>
            {erro && <p style={{ color: "red" }}>{erro}</p>}

            {!contaSelecionada ? (
                <table border="1" cellPadding="5" style={{ marginTop: "20px", borderCollapse: "collapse", width: "100%" }}>
                    <thead style={{ backgroundColor: "#f2f2f2" }}>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Login</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contas.map((conta) => (
                            <tr key={conta.id_conta}>
                                <td>{conta.id_conta}</td>
                                <td>{conta.nome}</td>
                                <td>{conta.login}</td>
                                <td>
                                    <button onClick={() => selecionarParaEditar(conta)} style={{ marginRight: "5px" }}>
                                        Editar
                                    </button>
                                    <button onClick={() => selecionarParaExcluir(conta)} style={{ color: "red" }}>
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : modo === "editar" ? (
                <EditarFormulario
                    conta={contaSelecionada}
                    onCancel={cancelar}
                    onUpdate={() => {
                        carregarContas();
                        cancelar();
                    }}
                />
            ) : (
                <ExcluirFormulario
                    conta={contaSelecionada}
                    onCancelar={cancelar}
                    onExclusaoSucesso={() => {
                        carregarContas();
                        cancelar();
                    }}
                />
            )}

            <BotaoVoltar />
        </div>
    );
}

export default Editar;
