
import { config } from "dotenv";
import {connectDb  } from "./config/database";
import app from "./app";

config();



connectDb();


app.listen(app.get("port"), () => {
  console.log("Listen on the port", app.get("port"));
});