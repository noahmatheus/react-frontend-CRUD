function SelecionarAgenteFormulario({ agentes, agenteSelecionado, setAgenteSelecionado, onEnviar }) {
    return (
        <div style={{ marginTop: "20px" }}>
            <select
                value={agenteSelecionado}
                onChange={e => setAgenteSelecionado(e.target.value)}
                style={{ padding: "10px", marginRight: "10px" }}
            >
                <option value="">-- Selecione um agente --</option>
                {agentes.map(agente => (
                    <option key={agente.id_agente} value={agente.id_agente}>
                        {agente.nome}
                    </option>
                ))}
            </select>

            <button
                onClick={onEnviar}
                style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
            >
                Enviar
            </button>
        </div>
    );
}

export default SelecionarAgenteFormulario;
