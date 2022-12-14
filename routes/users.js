const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.send("Welcome to project pursuit");
});

router.get(
  "/:userId",
  userController.authenticateToken,
  userController.getSingleUser
);

router.post("/signup", userController.addNewUser);
router.post("/login", userController.authenticateUser);

module.exports = router;
