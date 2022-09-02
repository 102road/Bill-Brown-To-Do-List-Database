require("dotenv").config();
const path = require("path");
const fs = require("fs");
const userDataJSONFile = path.join(__dirname, "../data/database/database.json");
const data = require(userDataJSONFile);
const jwt = require("jsonwebtoken");

const fetchData = () => {
  return data;
};

const fetchUser = (user) => {
  const singleUser = data.find((profile) => {
    if (profile.username == user) {
      return profile;
    }
  });
  return singleUser;
};

const writeData = (user) => {
  fs.writeFileSync(userDataJSONFile, JSON.stringify(user), "utf-8", (err) => {
    if (err) {
      console.log("There was an error when attempting to add new user", err);
    }
  });
};

const postData = (data) => {
  const database = fetchData();
  database.push(data);
  writeData(database);
};

const checkUsername = (user) => {
  const allUsers = fetchData();
  const userFound = allUsers.find((element) => element.username == user);
  return userFound;
};

const createUserToken = (user) => {
  const authToken = jwt.sign(
    { username: user },
    process.env.ACCESS_TOKEN_SECRET
  );
  return authToken;
};

module.exports = {
  fetchData,
  fetchUser,
  postData,
  checkUsername,
  createUserToken,
};
