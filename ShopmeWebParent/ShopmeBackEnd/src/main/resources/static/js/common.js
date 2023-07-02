document.addEventListener("DOMContentLoaded", function() {
    let logoutLink = document.querySelector("#logoutLink");
    logoutLink.addEventListener("click", function(e) {
        e.preventDefault();
        document.logoutForm.submit();
    });

    customizeDropDownMenu();
    customizeTabs();
});

function customizeDropDownMenu() {
    let dropdowns = document.querySelectorAll(".navbar .dropdown");
    dropdowns.forEach(function(dropdown) {
        dropdown.addEventListener("mouseenter", function() {
            let dropdownMenu = this.querySelector('.dropdown-menu');
            dropdownMenu.classList.add('show');
        });

        dropdown.addEventListener("mouseleave", function() {
            let dropdownMenu = this.querySelector('.dropdown-menu');
            dropdownMenu.classList.remove('show');
        });
    });

    let dropdownLinks = document.querySelectorAll(".dropdown > a");
    dropdownLinks.forEach(function(link) {
        link.addEventListener("click", function() {
            location.href = this.href;
        });
    });
}

function customizeTabs() {
    let url = document.location.toString();
    if (url.match('#')) {
        let tab = document.querySelector('.nav-tabs a[href="#' + url.split('#')[1] + '"]');
        if (tab) {
            let tabInstance = new bootstrap.Tab(tab);
            tabInstance.show();
        }
    }

    let tabLinks = document.querySelectorAll('.nav-tabs a');
    tabLinks.forEach(function(tabLink) {
        tabLink.addEventListener('shown.bs.tab', function (e) {
            window.location.hash = e.target.hash;
        });
    });
}
