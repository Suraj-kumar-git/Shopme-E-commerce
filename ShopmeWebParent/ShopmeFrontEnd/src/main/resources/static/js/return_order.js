let returnModal;
let modalTitle;
let fieldNote;
let orderId;
let divReason;
let divMessage;
let firstButton;
let secondButton;

document.addEventListener("DOMContentLoaded", function() {
    returnModal = document.querySelector("#returnOrderModal");
    modalTitle = document.querySelector("#returnOrderModalTitle");
    fieldNote = document.querySelector("#returnNote");
    divReason = document.querySelector("#divReason");
    divMessage = document.querySelector("#divMessage");
    firstButton = document.querySelector("#firstButton");
    secondButton = document.querySelector("#secondButton");

    handleReturnOrderLink();
});

function showReturnModalDialog(link) {
    divMessage.style.display = "none";
    divReason.style.display = "block";
    firstButton.style.display = "block";
    secondButton.textContent = "Cancel";
    fieldNote.value = "";

    orderId = link.getAttribute("orderId");
    modalTitle.textContent = "Return Order ID #" + orderId;
    let returnModalDialog = new bootstrap.Modal(returnModal);
    returnModalDialog.show();
}

function showMessageModal(message) {
    divReason.style.display = "none";
    firstButton.style.display = "none";
    secondButton.textContent = "Close";
    divMessage.textContent = message;

    divMessage.style.display = "block";
}

function handleReturnOrderLink() {
    let returnOrderLinks = document.querySelectorAll(".linkReturnOrder");
    returnOrderLinks.forEach(function(link) {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            showReturnModalDialog(this);
        });
    });
}

function submitReturnOrderForm() {
    let reason = document.querySelector("input[name='returnReason']:checked").value;
    let note = fieldNote.value;

    sendReturnOrderRequest(reason, note);

    return false;
}

function sendReturnOrderRequest(reason, note) {
    let requestURL = contextPath + "orders/return";
    let requestBody = JSON.stringify({ orderId: orderId, reason: reason, note: note });

    fetch(requestURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            [csrfHeaderName]: csrfValue
        },
        body: requestBody
    })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(function(returnResponse) {
            console.log(returnResponse);
            showMessageModal("Return request has been sent");
            updateStatusTextAndHideReturnButton(returnResponse.orderId);
        })
        .catch(function(err) {
            console.log(err);
            showMessageModal(err.message);
        });
}

function updateStatusTextAndHideReturnButton(orderId) {
    let textOrderStatusElements = document.querySelectorAll(".textOrderStatus" + orderId);
    textOrderStatusElements.forEach(function(element) {
        element.textContent = "RETURN_REQUESTED";
    });

    let linkReturnElements = document.querySelectorAll(".linkReturn" + orderId);
    linkReturnElements.forEach(function(element) {
        element.style.display = "none";
    });
}
