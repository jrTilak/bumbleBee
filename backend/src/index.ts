import app from "./app.js";
import { connectDB } from "./db/connection.js";

const PORT = process.env.PORT || 4657;

// app
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Bumble Bee is on port ${PORT} 🤖`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
