import express from "express";
import multer from "multer";
import path from "path";

import {
  displayAlladdedEvtol,
  loadEvtol,
  registerEvtol,
  getallRentEvtol,
  getRentData,
  searchEvtol,
} from "../controller/evtolController.js";

import { isLogin } from "../middleware/isLogin.js";

const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: "./ImagesUpload",
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});

// Init upload
const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|gif)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});

const router = express.Router();

// EVTOL ROUTES
router.post("/evtol/register", registerEvtol);
router.post("/evtol/load", loadEvtol);

// DASBOARD ROUTES
router.post("/addrentevtols", imageUpload.single("myrentfile"), registerEvtol);
router.get("/displayAllEvtol", displayAlladdedEvtol);
router.get("/getAvailableRentEvtol", isLogin, getallRentEvtol);
router.get("/getRentEvtolData", isLogin, getRentData);
router.get("/searchRentEvtol", searchEvtol);
export default router;
