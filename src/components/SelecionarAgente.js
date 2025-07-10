import { useCallback, useEffect, useState } from "react";
import BotaoVoltar from "../BotaoVoltar";
import SelecionarAgenteFormulario from "../SelecionarAgenteFormulario";

function SelecionarAgente() {
    const [agentes, setAgentes] = useState([]);
    const [agenteSelecionado, setAgenteSelecionado] = useState("");
    const [erro, setErro] = useState("");

    const carregarAgentes = useCallback(() => {
        const token = localStorage.getItem("token");

        fetch("http://vps.plenusti.com.br:61346/cosmos/api/agente/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) throw new Error("Erro ao carregar agentes");
                return res.json();
            })
            .then(data => setAgentes(data.dados)) // <--correção aqui para pegar de dados, endpoint exclusivo.
            .catch(() => setErro("Erro ao carregar agentes"));
    }, []);

    useEffect(() => {
        carregarAgentes();
    }, [carregarAgentes]);

    const handleEnviar = () => {
        if (!agenteSelecionado) {
            alert("Selecione um agente!");
            return;
        }

        // ## Esta rota em exclusivo não precisa de token, pois é pública.
        fetch(`http://vps.plenusti.com.br:61346/cosmos/api/general/treinar_llm/${agenteSelecionado}`, {
            method: "GET",
        })
            .then(res => {
                if (!res.ok) throw new Error("Erro ao enviar agente");
                alert("Agente enviado para treinamento com sucesso!");
            })
            .catch(() => alert("Erro ao treinar agente."));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Selecionar Agente</h2>
            {erro && <p style={{ color: "red" }}>{erro}</p>}

            <SelecionarAgenteFormulario
                agentes={agentes}
                agenteSelecionado={agenteSelecionado}
                setAgenteSelecionado={setAgenteSelecionado}
                onEnviar={handleEnviar}
            />

            <BotaoVoltar />
        </div>
    );
}

export default SelecionarAgente;
