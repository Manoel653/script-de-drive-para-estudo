import { criarUsuarios, listarUsuarios, editarUsuarios, deletarUsuario} from './crud.js';

export function setupUI() {
    document.getElementById('btnCriar').addEventListener('click', () => {
        
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();

        if (!nome || !email) {
            //esse alert será removido e colocaremos algo no css dps
            alert('Preencher todos os campos');
            return
        }

        criarUsuarios(nome, email);
        renderLista();
        document.getElementById('nome').value = '';
        document.getElementById('email').value = '';
    });
    renderLista();
};

function renderLista() {
    const lista = document.getElementById('listaUsuarios');
    lista.classList.add('lista-usuario');

    listarUsuarios(usuarios => {
        usuarios.forEach(usuario => {
            const li = document.createElement('li');

            li.innerHTML = `
            ${usuario.nome} (${usuario.email})
            <button class="botao-editar" onclick="editar(${usuario.id})">Editar</button>
            <button class="botao-excluir" onclick="excluir(${usuario.id})">Excluir</button>
            `;
            lista.appendChild(li);
        })
    })
}

window.editar = (id) => {
    const novoNome = prompt("Novo Nome");
    const novoEmail = prompt("Novo Email");

    if (novoNome && novoEmail) {
        editarUsuarios(id, novoNome, novoEmail);
        renderLista();
    }
}

window.excluir = (id) => {
    if (confirm("Tem certeza?")){
        deletarUsuario(id);
        renderLista();
    }
}