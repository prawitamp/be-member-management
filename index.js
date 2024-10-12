const express = require("express");
require("dotenv").config();
const indexRoutes = require("./src/routes/member.route.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/v1", indexRoutes);
app.use(cors({
  origin: [
    "http://localhost:5502",
    "http://localhost:3004",
  ],
})
);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
