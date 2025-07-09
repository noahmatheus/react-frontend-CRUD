import { useEffect, useState } from "react";
import EditarFormulario from "../EditarFormulario";
import ExcluirFormulario from "../ExcluirFormulario";

function Editar() {
    const [contas, setContas] = useState([]);
    const [contaSelecionada, setContaSelecionada] = useState(null);
    const [modo, setModo] = useState(null); // "editar" ou "excluir"
    const [erro, setErro] = useState("");

    const carregarContas = () => {
        const token = localStorage.getItem("token");

        fetch("http://vps.plenusti.com.br:61346/cosmos/api/conta/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Erro ao carregar contas");
                return res.json();
            })
            .then((data) => setContas(data))
            .catch(() => setErro("Erro ao carregar contas"));
    };

    useEffect(() => {
        carregarContas();
    }, []);

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

    // Função que será chamada após a atualização para recarregar e limpar a seleção
    const atualizaListaEFechaFormulario = () => {
        carregarContas();
        cancelar();
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Editar/Excluir Contas</h2>
            {erro && <p style={{ color: "red" }}>{erro}</p>}

            {!contaSelecionada ? (
                <ul>
                    {contas.map((conta) => (
                        <li key={conta.id_conta} style={{ marginBottom: "8px" }}>
                            {conta.nome} ({conta.login}){" "}
                            <button onClick={() => selecionarParaEditar(conta)}>Editar</button>{" "}
                            <button onClick={() => selecionarParaExcluir(conta)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            ) : modo === "editar" ? (
                <EditarFormulario
                    conta={contaSelecionada}
                    onCancel={cancelar}
                    onUpdate={atualizaListaEFechaFormulario}
                />
            ) : (
                <ExcluirFormulario
                    conta={contaSelecionada}
                    onCancel={cancelar}
                    onExclusaoSucesso={() => {
                        carregarContas();
                        cancelar();
                    }}
                />
            )}
        </div>
    );
}

export default Editar;