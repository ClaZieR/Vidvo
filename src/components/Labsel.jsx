import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAudioUrl } from './audioSlice';
import { storage } from './firbase';
import { ref, uploadBytes,getDownloadURL } from "firebase/storage";

function Labsel() {
  const [inputText, setInputText] = useState('');
  const [audioUrl, setAudioUrlLocal] = useState('');
  const dispatch = useDispatch();

  function handleChange(event) {
    setInputText(event.target.value);
  }

  function getAudio() {
    const url = "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM";
    let headers = {
      'xi-api-key': '40cf6900c4850ddc885253c6daf970bb',
      'Content-Type': 'application/json',
    };
    let data = {
      "text": inputText,
      "voice_settings": {
        "stability": 0,
        "similarity_boost": 0
      }
    };

    axios.post(url, data, {headers: headers, responseType: 'blob'})
    .then(response => {
      const audioBlob = new Blob([response.data], {type: 'audio/mp3'});
      const audioFilename = Math.floor(Math.random() * 1000000000) + '.mp3';
  const audioRef = ref(storage, audioFilename);
  uploadBytes(audioRef, audioBlob)
    .then(snapshot => {
      console.log('Uploaded audio successfully');
      getDownloadURL(snapshot.ref)
        .then(url => {
          console.log('Audio download URL:', url);
          dispatch(setAudioUrl(url));
          setAudioUrlLocal(url); // set local state as well if needed
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
})
    .catch(error => console.error(error));
  }

  return (
    <div>
      <textarea style={{ width: '30%', height: '50%' }} value={inputText} onChange={handleChange} />
      <br />
      <button onClick={getAudio}>Get Audio</button>
      {audioUrl && (
        <div>
          <audio controls src={audioUrl} />
        </div>
      )}
    </div>
  );
}

export default Labsel;
