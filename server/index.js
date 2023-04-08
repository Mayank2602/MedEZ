if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/MedEZ";

const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/item");
const searchRoutes = require("./routes/search");

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

mongoose.set('strictQuery', false);
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("MONGOOSE CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("IN MONGOOSE SOMETHING WENT WRONG", err);
  });

app.use(express.json());
app.use(
  cors({
    origin: "*", // client origin
  })
);


app.use("/api/auth", authRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/search", searchRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});