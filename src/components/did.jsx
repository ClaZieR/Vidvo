import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { storage } from './firbase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Did() {
  const [resultUrl, setResultUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const audioUrl = useSelector(state => state.audio.url); // get audioUrl from Redux
  const [selectedFile, setSelectedFile] = useState(null);

  const api_key = "ZHIuY2xhemllckBnbWFpbC5jb20:k9TcRl5CDuFLTwRk1mnw4"
  const url = "https://api.d-id.com/talks"
  let headers = {
    "Authorization": `Basic ${api_key}`,
    "Content-Type": "application/json"
  };
  let data = {
    "script": {
      "type": "audio",
      "audio_url": audioUrl, // use audioUrl from Redux
    },
    "source_url": fileUrl // set the fileUrl as source_url
  }

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleFileUpload = () => {
    const fileRef = ref(storage, selectedFile.name);
    uploadBytes(fileRef, selectedFile).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      getDownloadURL(fileRef).then((url) => {
        console.log(url);
        setFileUrl(url);
      }).catch((error) => {
        console.log('Error while retrieving download URL:', error);
      });
    }).catch((error) => {
      console.log('Error while uploading file:', error);
    });
  }

  function getResultUrl(id, headers) {
    axios.get(`https://api.d-id.com/talks/${id}`, {headers: headers})
      .then(response => { 
        const resultUrl = response.data.result_url;
        setResultUrl(resultUrl);
        setVideoUrl(resultUrl);
      })
      .catch(error => console.error(error));
  }

  function did() {
    console.log(audioUrl)
    axios.post(url, data, {headers: headers})
      .then(response => { 
        const id = response.data.id;
        console.log(id);
        const interval = setInterval(() => {
          getResultUrl(id, headers);
          if (resultUrl) {
            clearInterval(interval);
          }
        }, 1000);
        console.log(audioUrl)
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    if (audioUrl && fileUrl) { // only call did() if both audioUrl and fileUrl are available
      did();
    }
  }, [audioUrl, fileUrl]);

  return (
    <div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={handleFileUpload}>Upload file</button>
      <br></br>
      <button onClick={did}>Run D-ID</button>
      <br></br>
      {videoUrl && <video controls src={videoUrl} />}
      {!videoUrl && resultUrl && <h1>{resultUrl}</h1>}
    </div>
  )
}

export default Did;
