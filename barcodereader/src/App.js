import React, { useState, useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd'; // Drag-and-drop library for image input
import JsBarcode from 'jsbarcode';
// Choose your preferred decoding library
// import QuaggaJS from 'quaggajs'; // Example (replace with your choice)
import Jimp from 'jimp'; // Image processing library for handling images
import axios from 'axios';

const BarcodeDecoder = () => {
  const [decodedText, setDecodedText] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSelectImage = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleDecode = async () => {
    if (!imageFile) {
      alert('Please select an image to decode.');
      return;
    }

    try {
      const image = await Jimp.read(imageFile); // Use Jimp to read image
      const decodedResult = await image.getBase64Async(Jimp.MIME_JPEG); // Get base64 data

      // Use your chosen library to decode the base64 image data
      // Example with JsBarcode (replace with your library's decoding function)
      const decodedTextFromImage = JsBarcode(decodedResult);
      if (decodedTextFromImage) {
        setDecodedText(decodedTextFromImage.getText());



        try {
          // Replace with the actual base URL of the barcode calorie lookup API
          const baseUrl = ` https://world.openfoodfacts.org/api/v2/product/${decodedText}.json`;
      
          const response = await axios.get(baseUrl);
          response=response.json();

      
          if (response.data.success) {
            const calorieCount = response.data.nutriments.energy-kcal;
            console.log(`The calorie count for the edible item with barcode ${barcode} is: ${calorieCount}`);
          } else {
            console.error('Error retrieving calorie information:', response.data.error);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      } else {
        setDecodedText('No barcode found in the image.');
      }
    } catch (error) {
      console.error('Error decoding image:', error);
      setDecodedText('Error decoding image. Please try again.');
    }
  };

  return (
    <div className="barcode-decoder">
      <input type="file" accept="image/*" onChange={handleSelectImage} />
      <button onClick={handleDecode}>Decode Barcode</button>
      {decodedText && (
        <div>
          <p>Decoded Text: {decodedText}</p>
        </div>
      )}
    </div>
  );
};

export default BarcodeDecoder;