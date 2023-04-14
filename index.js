const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// app imports
const { PORT } = require("./src/helpers/env.js");
const dbConnect = require("./database/dbConnect.js");
const userRoutes = require("./src/api/routes/userRoutes");
const workRoutes = require("./src/api/routes/workRoutes.js");
const  searchRoutes = require("./src/api/routes/searchRoute.js");
const workerRoutes = require("./src/api/routes/workerRoutes.js");
const paymentRoutes = require("./src/api/routes/paymentRoute.js");
// database Connection
dbConnect();

// middle ware
// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "frontend", "build")));


// routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
})


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/work", workRoutes);
app.use("/api/v1/worker", workerRoutes);
app.use("/api/v1/search",searchRoutes);
app.use("/api/v1/payment",paymentRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log("listening on port : ", PORT);
});
