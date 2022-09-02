const express = require("express");
const app = express();
const cors = require("cors");
const bp = require("body-parser");

const usersRouter = require("./routes/users");
const dataRouter = require("./routes/data");

app.use(cors());
app.use(express.json());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use('/', (req,res)=> {
  res.send('Welcome the project pursuit database')
})
app.use("/users", usersRouter);
app.use("/projects", dataRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log("App is listening");
});
