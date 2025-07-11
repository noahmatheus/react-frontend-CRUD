import { useCallback, useEffect, useState } from "react";
import BotaoVoltar from "../BotaoVoltar";
import EditarFormulario from "../EditarFormulario";
import ExcluirFormulario from "../ExcluirFormulario";

function Editar() {
    const [contas, setContas] = useState([]);
    const [filtroNome, setFiltroNome] = useState(""); // estado para o filtro
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

    // Lista filtrada pela string do filtro (ignora case)
    const contasFiltradas = contas.filter(conta =>
        conta.nome.toLowerCase().includes(filtroNome.toLowerCase())
    );

    return (
        <div style={{ padding: "20px" }}>
            <h2>Editar/Excluir Contas</h2>
            {erro && <p style={{ color: "red" }}>{erro}</p>}

            {!contaSelecionada ? (
                <>
                    {/* Campo filtro */}
                    <div style={{ marginBottom: "15px" }}>
                        <label htmlFor="filtroNome" style={{ marginRight: "8px" }}>Filtrar por nome:</label>
                        <input
                            id="filtroNome"
                            type="text"
                            value={filtroNome}
                            onChange={e => setFiltroNome(e.target.value)}
                            placeholder="Digite um nome para buscar"
                            style={{
                                padding: "6px 10px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                width: "250px",
                                maxWidth: "100%",
                            }}
                        />
                    </div>

                    <table
                        border="1"
                        cellPadding="5"
                        style={{ marginTop: "10px", borderCollapse: "collapse", width: "100%" }}
                    >
                        <thead style={{ backgroundColor: "#f2f2f2" }}>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Login</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contasFiltradas.map(conta => (
                                <tr key={conta.id_conta}>
                                    <td>{conta.id_conta}</td>
                                    <td>{conta.nome}</td>
                                    <td>{conta.login}</td>
                                    <td>
                                        <button
                                            onClick={() => selecionarParaEditar(conta)}
                                            style={{
                                                backgroundColor: "#007bff",
                                                color: "#fff",
                                                padding: "6px 12px",
                                                border: "none",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                                marginRight: "8px",
                                                fontSize: "14px"
                                            }}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            onClick={() => selecionarParaExcluir(conta)}
                                            style={{
                                                backgroundColor: "#dc3545",
                                                color: "#fff",
                                                padding: "6px 12px",
                                                border: "none",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                                fontSize: "14px"
                                            }}
                                        >
                                            Excluir
                                        </button>
                                    </td>

                                </tr>
                            ))}
                            {contasFiltradas.length === 0 && (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: "center", padding: "10px" }}>
                                        Nenhuma conta encontrada.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
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
