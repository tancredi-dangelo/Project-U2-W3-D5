// FETCH DATA FROM API FUNCTION

const fetchData = function(callback) {

    fetch("https://striveschool-api.herokuapp.com/api/product", {
    headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZTUxODczOWY4NzAwMTU3YWIwODkiLCJpYXQiOjE3NzY0MTE5MjksImV4cCI6MTc3NzYyMTUyOX0.zAX0g1zhk1W48CBZ_IgthjtuMLRDLpZsFFCd8sPB4do"
    }
    })

    .then((response) => {
        if (response.ok) {
            console.log(response)
            return response.json()
        } else {
            console.log("No Response from API")
            console.log("Error: Code " + response.status)
        }
    })
    .then((data) => callback(data))

    .catch((error) => {
        console.log("Error: " + error)
        throw error
    })

}
