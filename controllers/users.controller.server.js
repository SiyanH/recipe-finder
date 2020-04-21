const userDao = require('../daos/users.dao.server')

module.exports = (app) => {

    const register = (req, res) => {
        const user = req.body
        userDao.createUser(user)
            .then(actualUser => {
                req.session['profile'] = actualUser
                actualUser.password = '****'
                res.send(actualUser)
            })
    }

    const profile = (req, res) =>
        res.send(req.session['profile'])

    const logout = (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }

    const login = (req, res) => {
        const username = req.body.username
        const password = req.body.password
        userDao.findUserByCredentials(username, password)
            .then(actualUser => {
                req.session['profile'] = actualUser
                actualUser.password = '****'
                res.send(actualUser)
            })
    }

    app.post('/login', login)
    app.post('/logout', logout)
    app.post('/profile', profile)
    app.post('/register', register)

    // register user
    app.post('/api/users', (req, res) => {
        const newUser = req.body
        userDao.createUser(newUser)
            .then(actualUser => {
                req.session['profile'] = actualUser
                actualUser.password = '****'
                res.send(actualUser)
            })
    })

    // delete a user
    app.delete('/api/users/:userId', (req, res) => {
        const userId = req.params.userId;
        userDao.deleteUser(userId)
            .then(status => res.send(status))
    })


    // validate user
    app.post('/api/login', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        console.log({username, password})

        userDao.findUserByCredentials(username, password)
            .then(user => {
                if(user) {
                    user.password = '****'
                    req.session['profile'] = user
                    return res.send(user)
                } else {
                    return res.status(403).send({
                                                    message: `User ${username} not found`
                                                })
                }
            })
    })

    // role for administrator
    app.get('/api/users', (req, res) =>
        userDao.findAllUsers()
            .then(allUsers => res.send(allUsers)))

    // role for administrator
    app.get('/api/users/:userId', (req, res) => {
        const userId = req.params.userId
        userDao.findUserById(userId).then(userFound => res.send(userFound))})


    app.get('/api/users/profile', (req, res) => {
        const profile = req.session['profile'];
        userDao.findUserById()
        //console.log({profile, session: req.session, profile2: req.session.profile})
        return res.send(profile);
    })

    app.post('/api/users/profile', (req, res) => {
        res.send(req.session['profile'])
    })

    //call for update user
    app.put('/api/users/:userId', (req, res) => {
        const userId = req.params.userId
        const newUser = req.body
        userDao.updateUser(userId,newUser).then(updatedUser => res.send(updatedUser))
    })
}