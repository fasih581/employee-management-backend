const axios = require("axios")

// exports.homeRoutes = (req, res) => {
//     // make a GET request to/api/emploees
//     axios.get('http://localhost:8080/api/employees')
//     .then(function(response){
//         console.log(response.data)
//         res.render("index.ejs", {employees : response.data});
//     })
//     .catch(err =>{
//         res.send(err);
//     })
// };

exports.homeRoutes = (req, res) => {
    res.render("index");
}