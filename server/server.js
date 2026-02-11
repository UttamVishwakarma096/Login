const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/loginDB")
  .then(() => console.log("connected to MongoDB"))
  .catch((error) => console.error("Connection error: ", error));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("user", userSchema);

//react page portId
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Recived data: ", username, password);

  try {
    const user = await User.findOne({ username: username });

    if (user) {
      if (user.password === password) {
        res.json({ massage: "Login Succsess!", user: user });
      } else {
        res.json({ massage: "Wrong Password" });
      }
    } else {
      res.status(404).json({ massage: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "server error" });
    console.error("Server Error: ", error);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
