import app from "./app";
import { connectDB } from "./db/connection";
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
//# sourceMappingURL=index.js.map