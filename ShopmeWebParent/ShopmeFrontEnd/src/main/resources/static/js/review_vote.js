document.addEventListener("DOMContentLoaded", function() {
    let linkVoteReviewElements = document.querySelectorAll(".linkVoteReview");
    linkVoteReviewElements.forEach(function(element) {
        element.addEventListener("click", function(e) {
            e.preventDefault();
            voteReview(this);
        });
    });
});

function voteReview(currentLink) {
    let requestURL = currentLink.getAttribute("href");

    fetch(requestURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            [csrfHeaderName]: csrfValue
        }
    })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error voting review.");
            }
        })
        .then(function(voteResult) {
            console.log(voteResult);

            if (voteResult.successful) {
                let modalDialog = document.querySelector("#modalDialog");
                modalDialog.addEventListener("hide.bs.modal", function(e) {
                    updateVoteCountAndIcons(currentLink, voteResult);
                });
            }

            showModalDialog("Vote Review", voteResult.message);

        })
        .catch(function(error) {
            showErrorModal(error.message);
        });
}

function updateVoteCountAndIcons(currentLink, voteResult) {
    let reviewId = currentLink.getAttribute("reviewId");
    let voteUpLink = document.querySelector("#linkVoteUp-" + reviewId);
    let voteDownLink = document.querySelector("#linkVoteDown-" + reviewId);

    document.querySelector("#voteCount-" + reviewId).textContent = voteResult.voteCount + " Votes";

    let message = voteResult.message;

    if (message.includes("successfully voted up")) {
        highlightVoteUpIcon(voteUpLink, voteDownLink);
    } else if (message.includes("successfully voted down")) {
        highlightVoteDownIcon(voteDownLink, voteUpLink);
    } else if (message.includes("unvoted down")) {
        unhighlightVoteDownIcon(voteDownLink);
    } else if (message.includes("unvoted up")) {
        unhighlightVoteUpIcon(voteUpLink);
    }
}

function highlightVoteUpIcon(voteUpLink, voteDownLink) {
    voteUpLink.classList.remove("far");
    voteUpLink.classList.add("fas");
    voteUpLink.setAttribute("title", "Undo vote up this review");
    voteDownLink.classList.remove("fas");
    voteDownLink.classList.add("far");
}

function highlightVoteDownIcon(voteDownLink, voteUpLink) {
    voteDownLink.classList.remove("far");
    voteDownLink.classList.add("fas");
    voteDownLink.setAttribute("title", "Undo vote down this review");
    voteUpLink.classList.remove("fas");
    voteUpLink.classList.add("far");
}

function unhighlightVoteDownIcon(voteDownLink) {
    voteDownLink.setAttribute("title", "Vote down this review");
    voteDownLink.classList.remove("fas");
    voteDownLink.classList.add("far");
}

function unhighlightVoteUpIcon(voteUpLink) {
    voteUpLink.setAttribute("title", "Vote up this review");
    voteUpLink.classList.remove("fas");
    voteUpLink.classList.add("far");
}
