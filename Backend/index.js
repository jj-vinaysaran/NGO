const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');


const adminRoutes = require('./routes/adminRoute');
const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/postRoute');


const app = express();

app.use(bodyParser.json());
app.use(cors());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const upload = multer({ storage });
  
  app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
  });


app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

const port = 5000;
app.listen(port,()=> {
    console.log(`Listening to the Server at ${port}`);
})