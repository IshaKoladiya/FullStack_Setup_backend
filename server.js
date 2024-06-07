const db = require("./db");
const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const cors = require("cors");
const {
  createToken,
  createHash,
  compareHash,
  verifyToken,
} = require("./utils");
const userModal = require("./model_schema/userModelSchema");
app.use(cors());
app.use(express.json());

// testing
app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {

    const findUserByEmail = await userModal.findOne({ email: email });

    if (findUserByEmail) {
      return res.status(404).send("alredy exist");
    }

    const hash = await createHash(password);

    const newUser = new userModal({
      name,
      email,
      password: hash,
    });

    const savedUser = await newUser.save();

    const token = createToken({ id: savedUser._id });

    res.status(200).send({token , savedUser});
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(4000, () => {
  console.log("server listening on port 4000");
}); 
