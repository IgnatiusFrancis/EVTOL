import express from "express";

import { dbConnection } from "./DBConnection/DBConnect.js";

import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import EvtolRouter from "./routes/evtolRoute.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://evtol-task.onrender.com/"],
  })
);
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );

  next();
});

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
