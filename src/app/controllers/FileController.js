const multer = require('multer');
const path = require('path');
var admin = require("firebase-admin");

// Initialize Firebase admin SDK
var serviceAccount = require("/IOT/src/public/js/iot-chale-firebase-adminsdk-6kkdm-a6d9d225d2.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://iot-chale-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "gs://iot-chale.appspot.com"
});

// Configure multer to store uploaded files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const bucket = admin.storage().bucket();

class FileController {
  // Render the OTA page
  getdata(req, res) {
    res.render('OTA');
  }

  // Handle file upload
  async pushfile(req, res) {
    try {
      console.log(1)
      const file = req.file;
      if (!file) {
        return res.status(400).send('No file uploaded.');
      }

      // Create a unique path in Firebase Storage
      const storagePath = Date.now() + path.extname(file.originalname);

      // Upload file to Firebase Storage
      const fileUpload = bucket.file(storagePath);
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype
        }
      });

      stream.on('error', (err) => {
        console.error('Error uploading to Firebase:', err);
        res.status(500).send('Error uploading file to Firebase.');
      });

      stream.on('finish', async () => {
        // File uploaded successfully
        try {
          // Get the download URL of the uploaded file
          const url = await fileUpload.getSignedUrl({
            action: 'read',
            expires: '03-01-2500' // Change this to your desired expiration date
          });

          res.status(200).send({ message: 'File uploaded successfully to Firebase.', url: url[0] });
        } catch (urlError) {
          console.error('Error getting download URL:', urlError);
          res.status(500).send('File uploaded but failed to retrieve download URL.');
        }
      });

      stream.end(file.buffer);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error uploading file');
    }
  }
}

// Middleware to handle file upload
FileController.prototype.uploadMiddleware = upload.single('file');

module.exports = new FileController();
