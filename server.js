import express from "express";

import { dbConnection } from "./DBConnection/DBConnect.js";

import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import EvtolRouter from "./routes/evtolRoute.js";
import { createServer } from "http";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
dbConnection();

const port = process.env.PORT || 5000;

app.use("/api/aya/users", userRouter);
app.use("/evtol/admin", adminRouter);

app.use("/ImagesUpload", express.static("ImagesUpload"));
app.use("/evtol/", EvtolRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    data: {
      message: `Can't find ${req.originalUrl} on this server`,
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running at http:localhost:${port}`);
});
