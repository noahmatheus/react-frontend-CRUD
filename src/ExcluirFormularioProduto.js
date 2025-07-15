function ExcluirFormularioProduto({ produto, onCancel, onExclusaoSucesso }) {

    const handleExcluir = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`https://renderproject-deploy.onrender.com/api/produtos/${produto.id_produto}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Erro ao excluir");

            alert("Produto excluído com sucesso!");
            onExclusaoSucesso();
        } catch (err) {
            alert("Erro ao excluir produto.");
        }
    };

    return (
        <div style={{ marginTop: "20px" }}>
            <h3>Deseja excluir a produto "{produto.nome}"?</h3>
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

export default ExcluirFormularioProduto;