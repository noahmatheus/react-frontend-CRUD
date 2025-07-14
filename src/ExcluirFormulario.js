function ExcluirFormulario({ conta, onCancel, onExclusaoSucesso }) {

    const handleExcluir = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`http://vps.plenusti.com.br:61346/cosmos/api/conta/${conta.id_conta}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Erro ao excluir");

            alert("Conta excluída com sucesso!");
            onExclusaoSucesso();
        } catch (err) {
            alert("Erro ao excluir conta.");
        }
    };

    return (
        // <div style={{ marginTop: "20px" }}>
        //     <h3>Deseja excluir a conta "{conta.nome}"?</h3>
        //     <button onClick={handleExcluir} style={{ marginRight: "10px", background: "red", color: "white" }}>
        //         Confirmar Exclusão
        //     </button>
        //     <button onClick={onCancel}>Cancelar</button>
        // </div>
        // novo manual
        <div style={{ marginTop: "20px" }}>
            <h3>Deseja excluir a conta "{conta.nome}"?</h3>
            <div style={{ display: "flex", gap: "10px" }}>
                <button
                    onClick={handleExcluir}
                    style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "10px 15px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        flex: 1
                    }}>
                    Confirmar Exclusão
                </button>
                <button
                    onClick={onCancel}
                    style={{
                        backgroundColor: "#6c757d",
                        color: "#fff",
                        padding: "10px 15px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        flex: 1
                    }}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default ExcluirFormulario;
