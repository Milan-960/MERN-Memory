import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

const PORT = process.env.PORT || 8000;
// const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Server Running on Port: https://mern-memories-projects.herokuapp.com:${PORT}`
      )
    )
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
