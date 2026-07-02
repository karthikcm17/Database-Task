const express = require("express");
const connectDB = require("./config/db.config");
const postRoutes = require("./routes/post.routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(express.json());

app.use("/api", postRoutes);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Mongoose Database API Server running." });
});

app.listen(PORT, () => {
    console.log(`Server is running smoothly on port ${PORT}`);
});