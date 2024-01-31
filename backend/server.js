require("dotenv").config();
const app = require("./src/app");
const { connectDB } = require("./src/DB/db");

const PORT = process.env.PORT || 8080;

connectDB()
  .then((db) => {
    app.context.db = db;
    app.listen(PORT, (err) => {
      if (err) {
        console.log("Error occurred while starting the server..." + err);
        return;
      }

      console.log(`Server started on PORT --> ${PORT}`);
      console.log("Node environment --> " + process.env.NODE_ENV);
    });
  })
  .catch((err) => console.log("err while collecting db : ", err));
