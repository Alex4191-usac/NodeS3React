const express = require('express');
const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const shortId = require('shortid');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());

  
let s3 = new S3Client({
    region: 'us-east-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCES_KEY,
    }
  });

// Configure multer middleware to handle the file upload
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'testbuckets3alex',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, shortId.generate() + '-' + file.originalname);
        },
    }),
});

// Handle POST request to upload the image
app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file.location);
  // Return the URL of the uploaded image to the client
  res.json({ imageUrl: req.file.location });
});

// Start the server
app.listen(process.env.API_PORT, () => {
  console.log(`Server started on port ${process.env.API_PORT}` );
});


