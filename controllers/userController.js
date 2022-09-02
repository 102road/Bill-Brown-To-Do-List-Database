require("dotenv").config();
const users = require("../modals/users");
const bcrypt = require("bcrypt");
const uniqid = require("uniqid");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const getAllUsers = (req, res) => {
  res.send(users.fetchData());
};

const getSingleUser = (req, res) => {
  const singleUser = users.fetchUser(req.params.userId);
  res.status(200).send(singleUser);
};

const addNewUser = async (req, res) => {
  try {
    const checkedUsername = users.checkUsername(req.body.username);
    if (checkedUsername) {
      res.sendStatus(403);
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = {
        id: uniqid(),
        username: req.body.username,
        password: hashedPassword,
      };
      users.postData(user);
      fs.writeFile(`./data/${req.body.username}.json`, "[]", (err) => {
        if (err) return console.log(err);
      });
      const authToken = users.createUserToken(req.body.username);
      res.status(200).json({ authToken: authToken });
    }
  } catch {
    res.sendStatus(500);
  }
};

const authenticateUser = async (req, res) => {
  const user = users.fetchUser(req.body.username);
  if (user === undefined) return res.sendStatus(401);
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const authToken = users.createUserToken(req.body.username);
      res.status(200).json({ authToken: authToken });
    }
  } catch {
    res.sendStatus(501);
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorisation"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  addNewUser,
  authenticateUser,
  authenticateToken,
};
