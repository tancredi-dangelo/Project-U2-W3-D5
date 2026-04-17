// DOM ELEMENTS 
const productForm = document.getElementById("productRegistrationForm")
const clearInputButton = document.getElementById("clearInput")
const productsList = document.getElementById("productsList")

// TOKEN CONST
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZTUxODczOWY4NzAwMTU3YWIwODkiLCJpYXQiOjE3NzY0MTE5MjksImV4cCI6MTc3NzYyMTUyOX0.zAX0g1zhk1W48CBZ_IgthjtuMLRDLpZsFFCd8sPB4do"

// INITIALIZE PRODUCT CLASS
class Product {
    constructor(_name, _description, _brand, _image, _price) {
        this.name = _name
        this.description = _description
        this.brand = _brand
        this.imageUrl = _image
        this.price = parseFloat(_price)
    }
}

let selectedProductId = null

const list = document.createElement("div")
list.classList.add("row", "row-cols-1", "row-cols-sm-2", "row-cols-md-3", "row-cols-lg-4", "g-3", "m-5")

const displayProductList = function(data) {

    list.innerHTML = ""
    
    data.forEach(product => {

        const listItem = document.createElement("div")
        listItem.classList.add("col")

        const item = document.createElement("div")
        item.classList.add("card", "h-100", "d-flex", "flex-column", "justify-content-between")

        const productImg = document.createElement("img")
        productImg.classList.add("card-img-top")
        productImg.style = "height: 100px; object-fit: cover;"
        productImg.alt = product.brand + " - " + product.name
        productImg.src = product.imageUrl

        const cardBody = document.createElement("div")
        cardBody.classList.add("card-body", "p-3") // ✅ was p1

        const productName = document.createElement("h6")
        productName.classList.add("mb-2")
        productName.style.cursor = "pointer"
        productName.style.height = "60px"
        productName.style.overflow = "hidden"
        productName.innerText = product.brand + " - " + product.name

        // when product name is clicked, form is populated with its values
        productName.addEventListener("click", () => {
            selectedProductId = product._id
            document.getElementById("productName").value = product.name
            document.getElementById("productDescription").value = product.description
            document.getElementById("productBrand").value = product.brand
            document.getElementById("productImage").value = product.imageUrl
            document.getElementById("productPrice").value = product.price
            document.getElementById("productRegistrationForm").scrollIntoView({ behavior: "smooth" })
        })

        const productId = document.createElement("p")
        productId.innerText = product._id
        productId.classList.add("mb-3")

        const productPrice = document.createElement("h6")
        productPrice.innerText = product.price + "$"
        productPrice.classList.add("mb-3")

        const editProductBtn = document.createElement("button")
        editProductBtn.classList.add("btn", "btn-primary", "m-1")
        editProductBtn.innerText = "Edit"

        // when edit button is clicked, form is populated with its values
        editProductBtn.addEventListener("click", () => {
            selectedProductId = product._id
            document.getElementById("productName").value = product.name
            document.getElementById("productDescription").value = product.description
            document.getElementById("productBrand").value = product.brand
            document.getElementById("productImage").value = product.imageUrl
            document.getElementById("productPrice").value = product.price
            document.getElementById("productRegistrationForm").scrollIntoView({ behavior: "smooth" })
        })

        const deleteProductBtn = document.createElement("button")
        deleteProductBtn.classList.add("btn", "btn-danger", "m-1")
        deleteProductBtn.innerText = "Delete"

        cardBody.append(productName, productId, productPrice, editProductBtn, deleteProductBtn)

        // delete confirmation logic
        let isConfirming = false

        deleteProductBtn.addEventListener("click", (e) => {
            e.preventDefault()

            if (!isConfirming) {
                isConfirming = true
                selectedProductId = product._id // set id on first click
                deleteProductBtn.innerText = "Confirm?"

                const discardDeletion = document.createElement("button")
                discardDeletion.innerText = "Discard"
                discardDeletion.classList.add("btn", "btn-secondary", "m-1")
                cardBody.appendChild(discardDeletion)

                discardDeletion.addEventListener("click", () => {
                    isConfirming = false
                    //  reset id on discard
                    selectedProductId = null 
                    discardDeletion.remove()
                    deleteProductBtn.innerText = "Delete Product"
                })

            } else {
                // second click confirms deletion
                deleteProduct(e) 
            }
        })

        item.append(productImg, cardBody)
        listItem.appendChild(item)
        list.appendChild(listItem)
    })

    productsList.appendChild(list)
}


// DELETE PRODUCT FUNCTION
const deleteProduct = function(e) {

    e.preventDefault()

    if (!selectedProductId) {
        console.log("No product selected")
        return
    }

    fetch(`https://striveschool-api.herokuapp.com/api/product/${selectedProductId}`, {
        method: "DELETE",
        headers: { "Authorization": TOKEN }
    })
    .then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            return response.text().then((err) => { throw new Error(err) })
        }
    })
    .then((data) => {
        console.log("Product deleted:", data) 
        selectedProductId = null
        fetchData(displayProductList) 
    })
    .catch((error) => console.log("Error:", error))
}


// EDIT PRODUCT FUNCTION
const editProduct = function(e) {

    e.preventDefault()

    if (!selectedProductId) {
        console.log("No product selected")
        return
    }

    const product = new Product(
        document.getElementById("productName").value,
        document.getElementById("productDescription").value,
        document.getElementById("productBrand").value,
        document.getElementById("productImage").value,
        document.getElementById("productPrice").value
    )

    fetch(`https://striveschool-api.herokuapp.com/api/product/${selectedProductId}`, {
        method: "PUT",
        headers: {
            "Authorization": TOKEN,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product)
    })
    .then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            return response.text().then((err) => { throw new Error(err) })
        }
    })
    .then((data) => {
        console.log("Product edited:", data)
        productForm.reset()
        selectedProductId = null
        fetchData(displayProductList) // ✅ removed redundant fetchData
    })
    .catch((error) => console.log("Error:", error))
}


// ADD EVENT LISTENERS 
productForm.addEventListener("submit", editProduct)
clearInputButton.addEventListener("click", () => {
    selectedProductId = null
    productForm.reset()
})


// CHECK PASSWORD TO ENTER AREA

const PASSWORD = "password123"

const checkPassword = function() {
    const input = prompt("Enter password to access this area:")
    if (input !== PASSWORD) {
        alert("Wrong password!")
        window.location.href = "../index.html"
    }
}

checkPassword() 


// CALL FETCH DATA FUNCTION

fetchData(displayProductList) 