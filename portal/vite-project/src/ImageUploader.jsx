import { useState } from 'react';
import axios from 'axios';
import ImageCase from './components/ImageCase';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    axios.post('http://localhost:3000/upload', formData)
      .then((response) => {
        console.log('Image uploaded successfully:', response.data.imageUrl);
        setImageUrl(response.data.imageUrl);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {imageUrl && (<ImageCase url={imageUrl}/>)}
    </div>
  );
};

export default ImageUploader;