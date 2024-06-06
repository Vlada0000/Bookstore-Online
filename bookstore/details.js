document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(location.search);
    const asin = params.get("asin");
    //console.log(asin)
    fetch("https://striveschool-api.herokuapp.com/books/" + asin)
        .then(response => {
            return response.json()
        })
        .then(data => {
            let card = `
            <div class="card mb-4 shadow-sm" style="width: 18rem;">
                <img src="${data.img}" class="card-img-top" alt="${data.title}">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text"><strong>Price:</strong> ${data.price}</p>
                </div>
            </div>
            `

            let details = document.getElementById("details")
            details.innerHTML += card

        })
})
