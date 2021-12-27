const express = require("express");
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/db");
const app = express();
const dev = process.env.NODE_ENV.includes("dev");

// configure database and mongoose
mongoose
  .connect(
    dev
      ? `mongodb://${config.dev.domain}:27017/${config.dev.database}`
      : `mongodb://${config.production.username}:${config.production.password}@${config.production.domain}:27017/${config.production.database}`,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });
// db configuaration ends here

// registering cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware
const auth = require("./middleware/auth");
app.use(auth);
// middleware ends here

// app.use("/uploads", express.static("uploads"));

// routes
const userRoute = require("./api/routes/user");
const tokenRoute = require("./api/routes/token");

app.use("/users", userRoute);
app.use("/tokens", tokenRoute);
// routes end here

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
