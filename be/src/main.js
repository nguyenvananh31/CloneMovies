import express from "express";
import dotenv from "dotenv";
import routes from "./routes/api.js";
import cors from "cors";
import bodyParser from "body-parser";
import connectMongoDB from "./config/dbconfig.js";
import multer from "multer";
import uploadToCloudinary from "./util/cloudinary.js";


dotenv.config()

const port = process.env.PORT
const url_db = process.env.URL_DB

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
      fileSize: 2 * 1024 * 1024, // 2 MB
      files: 1,
  },
});

app.post("/upload", upload.single("file"), async (req, res, next) => {
  if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
  }

  try {
      const result = await uploadToCloudinary(req.file);
      return res.status(201).json({
          url: result.url,
      });
  } catch (err) {
      return res.status(500).json({ error: err });
  }
});


connectMongoDB(url_db);
app.use("/api" , routes)


  app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })


export const viteNodeApp = app;
