import { useCallback, useEffect, useState } from "react";
import BotaoVoltar from "../BotaoVoltar";
import EditarFormularioConfiguracao from "../EditarFormularioConfiguracao";

function EditarConfiguracao() {
    const [configuracaoSelecionada, setConfiguracaoSelecionada] = useState(null);
    const [erro, setErro] = useState("");

    const carregarConfiguracoes = useCallback(() => {
        const token = localStorage.getItem("token");

        fetch("https://renderproject-deploy.onrender.com/api/configuracao/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Erro ao carregar configurações");
                }
                return res.json();
            })
            .then(data => {
                if (data && data.length > 0) {
                    setConfiguracaoSelecionada(data[0]);
                }
            })
            .catch(() => setErro("Erro ao carregar configurações"));
    }, []);

    useEffect(() => {
        carregarConfiguracoes();
    }, [carregarConfiguracoes]);

    const cancelar = () => {
        setConfiguracaoSelecionada(null);
    };

    if (erro) {
        return (
            <div style={{ padding: "20px" }}>
                <p style={{ color: "red" }}>{erro}</p>
                <BotaoVoltar />
            </div>
        );
    }

    if (!configuracaoSelecionada) {
        return (
            <div style={{ padding: "20px" }}>
                <p>Carregando configurações...</p>
                <BotaoVoltar />
            </div>
        );
    }

    return (
        <div style={{ padding: "20px" }}>
            <EditarFormularioConfiguracao
                configuracao={configuracaoSelecionada}
                onCancel={cancelar}
                onUpdate={() => {
                    carregarConfiguracoes();
                }}
            />
            <BotaoVoltar />
        </div>
    );
}

export default EditarConfiguracao; 