const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

// local data base
// mongoose
//   .connect(process.env.DATABASE_LOCAL)
//   .then(() => console.log("DB connection successful!"));

// MongoDB atlas
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
