const auth = (req, res, next) => {

    if(!req.session.user) {
        res.redirect('/login')
        return
    }

    next()

}

module.exports = auth