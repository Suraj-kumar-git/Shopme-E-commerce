function showModalDialog(title, message) {
    let modalTitle = document.getElementById("modalTitle");
    let modalBody = document.getElementById("modalBody");

    modalTitle.innerText = title;
    modalBody.innerText = message;

    let modalDialog = new bootstrap.Modal(document.getElementById("modalDialog"));
    modalDialog.show();
}

function showErrorModal(message) {
    showModalDialog("Error", message);
}

function showWarningModal(message) {
    showModalDialog("Warning", message);
}
