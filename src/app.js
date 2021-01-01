const express = require("express");
const path = require("path");
const Register = require("./models/registerSchema");
const bcrypt = require("bcryptjs");
require("./db/conn");

const port = process.env.PORT || 3000;

const app = express();

// setting public folder
app.use(express.static(`${path.join(__dirname, "../public")}`));
// setting view engine
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/login", async (req, res) => {
  try {
    const useremail = req.body.email;
    const userpassword = req.body.password;
    const data = await Register.findOne({ email: useremail });
    const check = bcrypt.compareSync(userpassword,data.password);
    if (check) {
      res.send("welcome");
    } else {
      res.send("Invalid login details");
    }
  } catch (e) {
    res.send("Invalid login details");
  }
});

app.post("/register", async (req, res) => {
  try {
    if (req.body.password === req.body.cpassword) {
      const hashpass = bcrypt.hashSync(req.body.password, 10);
      const newuser = new Register({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashpass,
      });
      const data = await newuser.save();
      res.send("register successfully");
    } else {
      res.send("Passwords are not same");
    }
  } catch (e) {
    res.send(e);
  }
});

// running the serverver

app.listen(port, () => {
  console.log("server is running on " + port);
});
