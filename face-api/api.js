const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const canvas = require('canvas');
const cors = require('cors');
const { recognizeFaces, run,labelsSaved } = require('./tiny_face');
const jsonData = fs.readFileSync('citoyens.json', 'utf8');
const data = JSON.parse(jsonData);
const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173'
  })
);
async function onAppStart() {
    console.log('Server is running on port 3000');
    await run();
}

app.use(fileUpload({
    useTempFiles: true
}));

app.post('/check', async (req, res) => {
  console.log('Checking user...');
  if (!req.files || Object.keys(req.files).length !== 3) {
      console.log('We need exactly 3 images.');
      return res.status(400).send('We need exactly 3 images.');
  }

  const images = [
      await canvas.loadImage(req.files.image1.tempFilePath),
      await canvas.loadImage(req.files.image2.tempFilePath),
      await canvas.loadImage(req.files.image3.tempFilePath)
  ];
  for (let i = 0; i < images.length; i++) {
    if (!images[i]) {
      console.log('Image ' + (i + 1) + ' is not valid.');
      return res.status(400).send('Image ' + (i + 1) + ' is not valid.');
    }
    console.log('Image ' + (i + 1) + ' is valid.');
  }

  const labelsFound = await recognizeFaces(images);

  // Remove confidence scores from labelsFound
  const labelsWithoutScores = labelsFound.map(label => label.split(' ')[0]);
  fs.unlink(req.files.image1.tempFilePath, (err) => {
    if (err) {
      console.error('Error deleting temporary file 1:', err);
    }
  });
  fs.unlink(req.files.image2.tempFilePath, (err) => {
    if (err) {
      console.error('Error deleting temporary file 2:', err);
    }
  });
  fs.unlink(req.files.image3.tempFilePath, (err) => {
    if (err) {
      console.error('Error deleting temporary file 3:', err);
    }
  });
  const uniqueLabels = [...new Set(labelsWithoutScores)];
  const finalLabels = uniqueLabels.filter(label => labelsSaved.includes(label));
  console.log('final Labels found:', finalLabels);
  if (finalLabels.length > 0) {
      const user = data.find(obj => obj.cin === finalLabels[0]);
      console.log('User found:', finalLabels[0]);
      res.json(user );
  } else {
      console.log('User not found');
      res.status(404).json({ error: "User not found" });
  }
});
//get citoyen by id
app.get('/citoyen/:id', (req, res) => {
  const user = data.find(obj => obj.cin === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }});
app.listen(3000, () => {
   onAppStart();
});
