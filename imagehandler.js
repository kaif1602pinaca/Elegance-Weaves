const express = require('express');
const { GridFSBucket, ObjectId } = require('mongodb');
const fs = require('fs');

const mongoose = require('mongoose');
const c = require('./DB/connect')
const db = mongoose.connection
const cors = require('cors')
const router = express();
router.use(cors())
console.log(db)
// Set up GridFSBucket
const gridFSBucket = new GridFSBucket(db);

// Path to the local folder containing images
const imageFolder = 'mykaladhar.com-1713546542751';

fs.readdir(imageFolder, (err, files) => {
  if (err) {
    console.error('Error reading image folder:', err);
    return;
  }

  files.forEach((file) => {
    const imageBuffer = fs.readFileSync(`${imageFolder}/${file}`);

    // Generate random price and rating
    const price = Math.floor(Math.random() * 5000) + 1000; // Random price between 100 and 5100
    const rating = Math.floor(Math.random() * 5) + 1; // Random rating between 1 and 5

    // Upload the image, price, and rating to GridFS
    const uploadStream = gridFSBucket.openUploadStream(file, {
      metadata: {
        price,
        rating
      }
    });
    uploadStream.end(imageBuffer);
  });
});


app.post("/products/add", (req,res) => {
    const productDetail = req.body;

    console.log("Product Detail >>>>", productDetail);

    Products.create(productDetail, (err, data) => {
        if (err) {
          res.status(500).send(err.message);
          console.log(err);
        } else {
          res.status(201).send(data);
        }
      });
})

app.get("/products/get", (req, res) => {
    Products.find((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  });


const PORT =  8081;
router.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
