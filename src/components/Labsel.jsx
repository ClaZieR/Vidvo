import React, { useState } from 'react';
import axios from 'axios';

function Labsel() {
  const [inputText, setInputText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

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
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      })
      .catch(error => console.error(error));
  }

  return (
    <div>
      <input type="text" value={inputText} onChange={handleChange} />
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
