const decimalSeparator = decimalPointType === 'COMMA' ? ',' : '.';
const thousandsSeparator = thousandsPointType === 'COMMA' ? ',' : '.';

document.addEventListener("DOMContentLoaded", function() {
    let linkMinusElements = document.querySelectorAll(".linkMinus");
    linkMinusElements.forEach(function(element) {
        element.addEventListener("click", function(evt) {
            evt.preventDefault();
            decreaseQuantity(this);
        });
    });

    let linkPlusElements = document.querySelectorAll(".linkPlus");
    linkPlusElements.forEach(function(element) {
        element.addEventListener("click", function(evt) {
            evt.preventDefault();
            increaseQuantity(this);
        });
    });

    let linkRemoveElements = document.querySelectorAll(".linkRemove");
    linkRemoveElements.forEach(function(element) {
        element.addEventListener("click", function(evt) {
            evt.preventDefault();
            removeProduct(this);
        });
    });
});

function decreaseQuantity(link) {
    const productId = link.getAttribute("pid");
    const quantityInput = document.querySelector("#quantity" + productId);
    let newQuantity = parseInt(quantityInput.value) - 1;

    if (newQuantity > 0) {
        quantityInput.value = newQuantity;
        updateQuantity(productId, newQuantity);
    } else {
        showWarningModal('Minimum quantity is 1');
    }
}

function increaseQuantity(link) {
    const productId = link.getAttribute("pid");
    const quantityInput = document.querySelector("#quantity" + productId);
    let newQuantity = parseInt(quantityInput.value) + 1;

    if (newQuantity <= 5) {
        quantityInput.value = newQuantity;
        updateQuantity(productId, newQuantity);
    } else {
        showWarningModal('Maximum quantity is 5');
    }
}

function updateQuantity(productId, quantity) {
    const url = contextPath + "cart/update/" + productId + "/" + quantity;

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            [csrfHeaderName]: csrfValue
        }
    })
        .then(function(response) {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("Error while updating product quantity.");
            }
        })
        .then(function(updatedSubtotal) {
            updateSubtotal(updatedSubtotal, productId);
            updateTotal();
        })
        .catch(function(error) {
            showErrorModal(error.message);
        });
}

function updateSubtotal(updatedSubtotal, productId) {
    document.querySelector("#subtotal" + productId).textContent = formatCurrency(updatedSubtotal);
}

function updateTotal() {
    let total = 0.0;
    let productCount = 0;

    let subtotalElements = document.querySelectorAll(".subtotal");
    subtotalElements.forEach(function(element) {
        productCount++;
        total += parseFloat(clearCurrencyFormat(element.innerHTML));
    });

    if (productCount < 1) {
        showEmptyShoppingCart();
    } else {
        document.querySelector("#total").textContent = formatCurrency(total);
    }
}

function showEmptyShoppingCart() {
    document.querySelector("#sectionTotal").style.display = "none";
    document.querySelector("#sectionEmptyCartMessage").classList.remove("d-none");
}

function removeProduct(link) {
    const url = link.getAttribute("href");

    fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            [csrfHeaderName]: csrfValue
        }
    })
        .then(function(response) {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("Error while removing product.");
            }
        })
        .then(function(response) {
            const rowNumber = link.getAttribute("rowNumber");
            removeProductHTML(rowNumber);
            updateTotal();
            updateCountNumbers();

            showModalDialog("Shopping Cart", response);
        })
        .catch(function(error) {
            showErrorModal(error.message);
        });
}

function removeProductHTML(rowNumber) {
    document.querySelector("#row" + rowNumber).remove();
    document.querySelector("#blankLine" + rowNumber).remove();
}

function updateCountNumbers() {
    let divCountElements = document.querySelectorAll(".divCount");
    divCountElements.forEach(function(element, index) {
        element.textContent = "" + (index + 1);
    });
}

function formatCurrency(amount) {
    return parseFloat(amount).toFixed(decimalDigits).replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
}

function clearCurrencyFormat(numberString) {
    let result = numberString.replaceAll(thousandsSeparator, "");
    return result.replaceAll(decimalSeparator, ".");
}
