const fs = require('fs');
const path = require('path');
const faceapi = require('face-api.js');
const canvas = require('canvas');
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
let labelsSaved=[];
async function LoadModels() {
  console.log('Loading models...');
  const modelPath = path.resolve(__dirname, 'models');
  await faceapi.nets.tinyFaceDetector.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68TinyNet.loadFromDisk(modelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
  console.log('Models loaded.');
}

async function getLabeledImages() {
  console.log('Loading labeled images...');
  const labels = fs.readdirSync('data');
  const labeledFaceDescriptors = await Promise.all(
    labels.map(async label => {
      console.log('Loading images of', label);
      const descriptors = [];
      const images = fs.readdirSync(path.join('data', label));
      for (let i = 0; i < images.length; i++) {
        const img = await canvas.loadImage(path.join('data', label, images[i]));
        const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks(true).withFaceDescriptor();
        if (detections && detections.descriptor){ 
        descriptors.push(detections.descriptor);
      }
      }
      labelsSaved.push(label);
      return new faceapi.LabeledFaceDescriptors(label, descriptors);

    })
  );
  console.log('Labeled images loaded.');
  return labeledFaceDescriptors;
}

async function run() {
  console.log('Running...');
  await LoadModels();
  labeledFaceDescriptors = await getLabeledImages();
  console.log('Ready to recognize faces!');
}

async function recognizeFaces(images) {
  console.log('Recognizing faces...');
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

  const labels = images.map(async (img) => {
    const detection = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks(true).withFaceDescriptor();
    if (!detection) {
      console.log('No face detected');
      return 'no face detected';
    }
    console.log('Face detected');
    const results = faceMatcher.findBestMatch(detection.descriptor);
    return results.toString();
  });

  return Promise.all(labels);
}


exports.recognizeFaces = recognizeFaces;
exports.run = run;
exports.labelsSaved = labelsSaved;
