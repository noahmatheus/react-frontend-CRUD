import { useEffect, useState } from "react";
import EditarFormulario from "../EditarFormulario";

function Editar() {
    const [contas, setContas] = useState([]);
    const [contaSelecionada, setContaSelecionada] = useState(null);

    const carregarContas = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://vps.plenusti.com.br:61346/cosmos/api/conta/", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setContas(data);
        } catch (err) {
            console.error("Erro ao carregar contas:", err);
        }
    };

    const handleEditar = (conta) => {
        setContaSelecionada(conta);
    };

    const handleCancelar = () => {
        setContaSelecionada(null);
    };

    const handleAtualizado = () => {
        carregarContas();
        setContaSelecionada(null);
    };

    useEffect(() => {
        carregarContas();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Editar Contas</h2>
            {!contaSelecionada && (
                <>
                    {contas.map((conta) => (
                        <div key={conta.id_conta} style={{ marginBottom: "10px" }}>
                            <strong>{conta.nome}</strong> ({conta.login})
                            <button style={{ marginLeft: "10px" }} onClick={() => handleEditar(conta)}>
                                Editar
                            </button>
                        </div>
                    ))}
                </>
            )}

            {contaSelecionada && (
                <EditarFormulario
                    conta={contaSelecionada}
                    onCancel={handleCancelar}
                    onUpdate={handleAtualizado}
                />
            )}
        </div>
    );
}

export default Editar;
