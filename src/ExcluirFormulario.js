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
        <div style={{ marginTop: "20px" }}>
            <h3>Deseja excluir a conta "{conta.nome}"?</h3>
            <button onClick={handleExcluir} style={{ marginRight: "10px", background: "red", color: "white" }}>
                Confirmar Exclusão
            </button>
            <button onClick={onCancel}>Cancelar</button>
        </div>
    );
}

export default ExcluirFormulario;
