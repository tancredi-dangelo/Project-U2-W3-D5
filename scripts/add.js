
// DOM ELEMENTS 
const productForm = document.getElementById("productRegistrationForm")
const clearInputButton = document.getElementById("clearInput")

// TOKEN CONST
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZTUxODczOWY4NzAwMTU3YWIwODkiLCJpYXQiOjE3NzY0MTE5MjksImV4cCI6MTc3NzYyMTUyOX0.zAX0g1zhk1W48CBZ_IgthjtuMLRDLpZsFFCd8sPB4do"


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



// POST PRODUCT TO API FUNCTION

const addProduct = function(e) {

    e.preventDefault()

    const productName = document.getElementById("productName").value
    const productDescription = document.getElementById("productDescription").value
    const productBrand = document.getElementById("productBrand").value
    const productImage = document.getElementById("productImage").value
    const productPrice = document.getElementById("productPrice").value

    const product = new Product(productName, productDescription, productBrand, productImage, productPrice)



    fetch("https://striveschool-api.herokuapp.com/api/product", {
        method: "POST",
        headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
        },
        body: JSON.stringify(product)
    })
    
    .then((response) => {

        if (response.ok) {
            console.log("Response Status: " + response.status)
            console.log(response)
            return response.json()

        } else {

            return response.json().then((err) => {
            console.log("Error:", err) 
            console.log("Status code:", response.status)
        })
        }
    })

    .then((data) => {
        console.log("Product added: ", data)
        productForm.reset()
        fetchData((data) => console.log("Updated list:", data))

    })

    .catch((error) => {
        console.log(error)
        throw error
    })

}


// ADD EVENT LISTENERS 

productForm.addEventListener("submit", addProduct)
clearInputButton.addEventListener("click", () => productForm.reset())



// CHECK PASSWORD TO ENTER AREA

const PASSWORD = "password123"

const checkPassword = function() {

    const input = prompt("Enter password to access this area:")
    
    if (input !== PASSWORD) {
        alert("Wrong password!")
        window.location.href = "index.html" 
    }
}

checkPassword()


// CALL FETCH DATA FUNCTION

fetchData((data) => console.log("Current Products: ", data))