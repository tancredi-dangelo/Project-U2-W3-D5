
// DOM ELEMENTS
const catalogue = document.getElementById("catalogue")


// CREATE CARD OF PRODUCT AND DISPLAY

const createCard = function(data) {

    data.forEach(element => { 

        const card = document.createElement("div")

        const image = element.imageUrl
        const name = element.name
        const brand = element.brand
        const description = element.description
        const price = element.price

        card.classList.add("col-12", "col-sm-6", "col-lg-4", "col-xl-3")
        

        card.innerHTML = `
            <div class="card border border-4">
                <img src="${image}" class="card-img-top" style="height: 200px; object-fit: cover;" alt="${description}">
                <div class="card-body">
                    <h5 style="min-height: 40px" class="card-title">${brand} ${name}</h5>
                    <p style="height: 50px" class="card-text">${description}</p>
                    <h6 style="min-height: 30px" class="card-text">${price}$</h6>
                    <div class="card-buttons-div">
                        <a href="detail.html" class="btn btn-sm btn-primary m-1">View Product</a>
                        <button class="btn btn-sm btn-primary m-1">Add to Cart</button>
                        <button class="btn btn-sm btn-secondary m-1">Hide</button>
                    </div>
                </div>
            </div>
        `

        catalogue.appendChild(card)

    });
    
}



// CALL FETCH DATA FUNCTION
fetchData(createCard)

