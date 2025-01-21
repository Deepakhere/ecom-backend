import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser";

import "./db/index.js";
import routes from "./router/index.js";
import { CORS_OPTIONS, SESSION_OPTIONS } from "./utils/enums.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors(CORS_OPTIONS));
app.use(session(SESSION_OPTIONS));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);

//server listen on port 4000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
