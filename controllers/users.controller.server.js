const userDao = require("../daos/users.dao.server");

module.exports = (app) => {
  const register = (req, res) => {
    const user = req.body;
    userDao.createUser(user).then((actualUser) => {
      req.session["profile"] = actualUser;
      actualUser.password = "****";
      res.send(actualUser);
    });
  };

  const profile = (req, res) => res.send(req.session["profile"]);

  const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  //we use this
  const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    userDao.findUserByCredentials(username, password).then((actualUser) => {
      req.session["profile"] = actualUser;
      actualUser.password = "****";
      res.send(actualUser);
    });
  };

  app.post("/login", login);
  app.post("/logout", logout);
  app.post("/profile", profile);
  app.post("/register", register);

  // register user
  app.post("/api/users", (req, res) => {
    const newUser = req.body;
    console.log(JSON.stringify(req.body));
    userDao.createUser(newUser).then((actualUser) => {
      req.session["profile"] = actualUser;
      actualUser.password = "****";
      res.send(actualUser);
    });
  });

  // delete a user
  app.delete("/api/users/:userId", (req, res) => {
    const userId = req.params.userId;
    userDao.deleteUser(userId).then((status) => res.send(status));
  });

  // validate user
  app.post("/api/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log({ username, password });

    userDao.findUserByCredentials(username, password).then((user) => {
      if (user) {
        user.password = "****";
        req.session["profile"] = user;
        return res.send(user);
      } else {
        return res.status(403).send({
          message: `User ${username} not found`,
        });
      }
    });
  });

  // GET: get data, there's no mutation on the database, there's two types 1. list  (all users)
  // 2. get specific user, by ID

  // POST: usually used for creating a resource, it means a record on the database
  // there's a body, and then you use the body for the creation of the record
  // if it's user, the body would a user

  // PATCH/PUT, they're being used for udpating a record
  // because it is not creating a data, it is updating one,
  // usually it 'll need an identifier of the data we want to update

  // DELETE
  // input: the id of the record
  // action: delete the record with that particular id

  // role for administrator
  app.get("/api/users", (req, res) =>
    userDao.findAllUsers().then((allUsers) => res.send(allUsers))
  );

  app.get("/api/users/profile", (req, res) => {
    const profile = req.session["profile"];
    //console.log({profile, session: req.session, profile2: req.session.profile})
    return res.send(profile);
  });

  //call for update user
  app.put("/api/users/", (req, res) => {
    //this sets the profile to current session
    const profile = req.session["profile"];
    const userId = profile._id;
    const newUser = req.body;

    userDao.updateUser(userId, newUser).then((updatedUser) => {
      req.session["profile"] = newUser;
      res.send(updatedUser);
    });
  });

  // // get user by user
  app.get("/api/users/:userId", (req, res) => {
    const userId = req.params.userId;
    userDao.findUserById(userId).then((userFound) => res.send(userFound));
  });

  //add subscriber url
  app.post("/api/users/subscribetoothers", (req, res) => {
    //variable for recipe
    //console.log(JSON.stringify(req.body));
    //username of other
    const profileUrl = req.body.profileUrlInfo;

    //console.log({ profileUrl });

    const profile = req.session["profile"];
    const userId = profile._id;
    userDao
      .subscribeToOthers(profileUrl, userId)
      .then((updatedUser) => res.send(updatedUser));
  });

  //add id to other user
  //find user of that id
  //add the current user id to their list of subscribed
  app.post("/api/users/otherparty", (req, res) => {
    console.log(req.body);
    //Get username of other user
    const profileUrl = req.body.profileUrlInfo;
    //Get id of current user
    const profile = req.session["profile"];
    const profileId = profile._id;
    console.log(profileId);
    userDao.addSubscriptionToOtherParty(profileUrl, profile);
  });

  // delete a user
  app.delete("/api/users/delete/:user", (req, res) => {
    const userName = req.params.user;
    userDao.deleteUserByUserName(userName).then((status) => res.send(status));
  });
};
