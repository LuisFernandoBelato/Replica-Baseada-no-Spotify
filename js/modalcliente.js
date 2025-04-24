// Função para abrir o modal e preencher os dados do cliente
function openEditModal(id, nome, sobrenome, cpf, dataNascimento, telefone, email) {
    document.getElementById('clienteId').value = id;
    document.getElementById('editNome').value = nome;
    document.getElementById('editSobrenome').value = sobrenome;
    document.getElementById('editCpf').value = cpf;
    document.getElementById('editDataNascimento').value = dataNascimento;
    document.getElementById('editTelefone').value = telefone;
    document.getElementById('editEmail').value = email;
    
    // Exibe o modal
    document.getElementById('editModal').style.display = 'block';
}

// Função para fechar o modal
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Função de exclusão de cliente
function deleteCliente(clienteId) {
    // Aqui você pode chamar uma API ou fazer uma requisição para excluir o cliente
    console.log('Cliente excluído com ID:', clienteId);
    // Chamar a API para excluir o cliente com o ID, por exemplo, com fetch:
    fetch(`/clientes/excluir/${clienteId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        alert('Cliente excluído com sucesso!');
        location.reload(); // Recarrega a página para refletir a exclusão
    })
    .catch(error => {
        alert('Erro ao excluir cliente');
    });
}

// Fechar o modal ao clicar no "X"
document.querySelector('.close').addEventListener('click', closeEditModal);
