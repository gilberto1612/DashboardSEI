window.processosSEI = [];

function criarStatusTag(status) {

    let classe = "status-ok";

    if (
        status.toLowerCase().includes("pendente")
    ) {
        classe = "status-pendente";
    }

    if (
        status.toLowerCase().includes("urgente")
    ) {
        classe = "status-urgente";
    }

    return `
        <span class="status-tag ${classe}">
            ${status}
        </span>
    `;
}

function renderTabela(lista) {

    const tbody =
        document.getElementById(
            "process-table-body"
        );

    tbody.innerHTML = "";

    lista.forEach(proc => {

        const tr =
            document.createElement("tr");

        tr.innerHTML = `
            <td>${proc.numero}</td>
            <td>${proc.assunto}</td>
            <td>${criarStatusTag(proc.status)}</td>
            <td>${proc.data}</td>
        `;

        tbody.appendChild(tr);
    });
}

function atualizarCards(lista) {

    document.getElementById(
        "total-processos"
    ).innerText = lista.length;

    document.getElementById(
        "novos-processos"
    ).innerText =
        lista.filter(
            p => p.novo
        ).length;

    document.getElementById(
        "pendentes-processos"
    ).innerText =
        lista.filter(
            p =>
                p.status
                .toLowerCase()
                .includes("pendente")
        ).length;

    document.getElementById(
        "urgentes-processos"
    ).innerText =
        lista.filter(
            p =>
                p.status
                .toLowerCase()
                .includes("urgente")
        ).length;
}

window.atualizarDashboard = function(lista) {

    window.processosSEI = lista;

    renderTabela(lista);

    atualizarCards(lista);

    document.getElementById(
        "status-text"
    ).innerText =
        "Atualizado: "
        + new Date().toLocaleTimeString();
}

function configurarPesquisa() {

    const input =
        document.getElementById(
            "search-input"
        );

    input.addEventListener(
        "input",
        () => {

            const termo =
                input.value.toLowerCase();

            const filtrados =
                window.processosSEI.filter(proc => {

                    return (
                        proc.numero
                        .toLowerCase()
                        .includes(termo)

                        ||

                        proc.assunto
                        .toLowerCase()
                        .includes(termo)
                    );
                });

            renderTabela(filtrados);
        }
    );
}

configurarPesquisa();
