const app = require("./src/app");
require("dotenv").config();
const { connectDB } = require("./src/DB/db");

const PORT = process.env.PORT || 8080;

connectDB().then((db) => {
  app.context.db = db;
  app.listen(PORT, (err) => {
    if (err) {
      console.log("Error occurred while starting the server..." + err);
      return;
    }

    console.log(`Server started on PORT --> ${PORT}`);
    console.log("Node environment --> " + process.env.NODE_ENV);
  });
});
