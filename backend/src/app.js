import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://fitpage-frontend.onrender.com",
    credentials: true, 
  })
);
app.use(bodyParser.json());

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
