
exports.homeRoutes = (req, res) => {
    res.render("index");
}

// render view employee details page
exports.viewRoutes = (req,res) => {
    res.render('view')
}

exports.loginRoutes = (req,res) => {
    res.render('login')
}

exports.signRoutes = (req,res) => {
    res.render('sign')
}