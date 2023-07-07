/* eslint-disable prefer-const */
import React, { useEffect, useRef } from 'react';
import Webcam from "react-webcam";
import Modal from 'react-modal';
import axios from 'axios';
import Spinner from './Spinner';


interface PhotoCaptureModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  setCIN: (CIN: string) => void;
  activateToast: (verification:boolean,cin:string) => void;
}



const PhotoCaptureModal: React.FC<PhotoCaptureModalProps> = ({ isOpen, onRequestClose , setCIN,activateToast}) => {
  const webcamRef = useRef<Webcam>(null);
  const [loading, setLoading] = React.useState(false);
  const takePictures = async () => {
    setLoading(false);
    if (webcamRef && webcamRef.current) {
      let images = [];
      for (let i = 0; i < 3; i++) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) { 
        images.push(imageSrc);
      }
        await new Promise((r) => setTimeout(r, 500)); // delay between photos
      }

      const formData = new FormData();
      images.forEach((image, index) => {
        const blob = dataURLtoBlob(image);
        formData.append(`image${index+1}`, blob);
      });
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:3000/check', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        const cin=response.data.cin;
        // handle response here
        setCIN(cin);
        onRequestClose();
        activateToast(true,cin);
      } catch (error) {
        // handle error here
        activateToast(false,'');
        onRequestClose();
      }
    }
    }
    const dataURLtoBlob = (dataURL:string) => {
      const parts = dataURL.split(',');
      const mime = parts[0]?.match(/:(.*?);/)?.[1];
      const bstr = atob(parts[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    };
    
  useEffect(() => {
    setTimeout(takePictures, 1000);
  },[isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Photo Capture Modal"
      className="flex items-center justify-center outline-none flex-col "
      overlayClassName="fixed inset-0 bg-black bg-opacity-80 "
    >
      <div className="bg-white  rounded-lg shadow-md">
      <h3 className="mb-4 text-black text-2xl font-bold text-center p-5 ">Vérification d'identité</h3>
      <div className="flex items-center justify-center">
        {loading 
          ? (<div className="spinner-container">
              <Spinner /> 
              <p className="spinner-message">Vérification d'identité...</p>
            </div>)
          : (      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="mb-4 rounded-lg border-solid border-2 border-green-600 p-5" />
          )}
      </div>


      </div>
    </Modal>
  );
};
export default PhotoCaptureModal;