import express from "express";
import path from "path";
import helmet from "helmet";
import {router} from "./routes/route"

const app = express();

const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(helmet());

app.use("/styles", express.static(path.join(__dirname, "styles")));

app.use(express.static(path.join(__dirname, "scripts")));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
