const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('./database')

function init(passport) {
    const userAuth =  (email, password, done) => {
        const userQuery = "SELECT * FROM google_projects.users WHERE email = ?";
        db.query(userQuery, [email], async (err, result) => {
            if (err) { throw err }
            if (result.length === 0) {
                return done(null, false, {message: "The e-mail entered matches no user on our database."})
            }
            bcrypt.compare(password, result[0].password, (err, response) => {
                if (err) { throw err}
                if (response) {
                    return done (null, result[0])
                } else {
                    return done(null, false)
                }
            })
        })

        
    }

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    userAuth
    ))

    passport.serializeUser((user, done) => done(null, user.userId))
    passport.deserializeUser((id, done) => {
        const query = "SELECT * FROM google_projects.users WHERE userId = ?";
        db.query(query, [id], (err, result) => {
            if (err) { throw err }
            const userInfo = {
                id: result[0].userId,
                email: result[0].email
            }
            done(null, userInfo)
        })
    })
}

module.exports = init;