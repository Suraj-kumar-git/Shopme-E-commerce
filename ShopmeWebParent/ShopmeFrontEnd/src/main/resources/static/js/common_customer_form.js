let dropDownCountry;
let dataListState;
let fieldState;

document.addEventListener("DOMContentLoaded", function() {
    dropDownCountry = document.querySelector("#country");
    dataListState = document.querySelector("#listStates");
    fieldState = document.querySelector("#state");

    dropDownCountry.addEventListener("change", function() {
        loadStatesForCountry();
        fieldState.value = "";
        fieldState.focus();
    });
});

function loadStatesForCountry() {
    let selectedCountry = document.querySelector("#country option:checked");
    let countryId = selectedCountry.value;
    let url = contextPath + "settings/list_states_by_country/" + countryId;

    fetch(url)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to connect to the server!");
            }
        })
        .then(function(responseJSON) {
            dataListState.innerHTML = "";

            responseJSON.forEach(function(state) {
                let option = document.createElement("option");
                option.value = state.name;
                option.textContent = state.name;
                dataListState.appendChild(option);
            });
        })
        .catch(function(error) {
            alert(error.message);
        });
}

function checkPasswordMatch(confirmPassword) {
    if (confirmPassword.value !== document.querySelector("#password").value) {
        confirmPassword.setCustomValidity("Passwords do not match!");
    } else {
        confirmPassword.setCustomValidity("");
    }
}
