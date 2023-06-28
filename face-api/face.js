const fs = require('fs');
const path = require('path');
const faceapi = require('face-api.js');
const canvas = require('canvas');
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
async function LoadModels() {
  console.log('Loading models...');
    // You should specify the path to the models
    const modelPath = path.resolve(__dirname, 'models');
    await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
    console.log('Models loaded.');
  }
  async function getLabeledImages() {
    console.log('Loading labeled images...');
    const labels = fs.readdirSync('data');
    const labeledFaceDescriptors = await Promise.all(
      labels.map(async label => {
        const descriptors = [];
        const images = fs.readdirSync(path.join('data', label));
        for (let i = 0; i < images.length; i++) {
          const img = await canvas.loadImage(path.join('data', label, images[i]));
          const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
          descriptors.push(detections.descriptor);
        }
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

    // process each image
    const labels = images.map(async (img) => {
        const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

        const results = faceMatcher.findBestMatch(detection.descriptor);

        // Assuming each image only contains one face, get the label of the first result
        return results.toString();
    });

    // Resolve all promises
    return Promise.all(labels);
}
exports.recognizeFaces = recognizeFaces;
exports.run = run;
