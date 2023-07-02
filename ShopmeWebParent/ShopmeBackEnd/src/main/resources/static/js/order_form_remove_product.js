document.addEventListener("DOMContentLoaded", function() {
    let productList = document.querySelector("#productList");
    productList.addEventListener("click", function(e) {
        if (e.target.classList.contains("linkRemove")) {
            e.preventDefault();

            if (doesOrderHaveOnlyOneProduct()) {
                showWarningModal("Could not remove product. The order must have at least one product.");
            } else {
                removeProduct(e.target);
                updateOrderAmounts();
            }
        }
    });
});

function removeProduct(link) {
    let rowNumber = link.getAttribute("rowNumber");
    document.querySelector("#row" + rowNumber).remove();
    document.querySelector("#blankLine" + rowNumber).remove();

    let divCountElements = document.querySelectorAll(".divCount");
    divCountElements.forEach(function(element, index) {
        element.innerHTML = "" + (index + 1);
    });
}

function doesOrderHaveOnlyOneProduct() {
    let productCount = document.querySelectorAll(".hiddenProductId").length;
    return productCount === 1;
}
